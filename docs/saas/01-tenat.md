Para transformar un esquema de autenticación estándar (como el de Better Auth o Auth.js) en uno **Multi-tenant**, la estrategia más común y eficiente para empezar es el **Aislamiento a nivel de Fila (Shared Schema)**.

Esto significa que casi todas tus tablas deben tener una referencia a un `tenantId`. Aquí te presento cómo ajustar tu esquema de Drizzle para soportar esto.

---

## 1. La Tabla de "Tenants" (Organizaciones)

Primero, necesitamos la entidad que agrupa a los usuarios. En un SaaS, esto suele llamarse `Organization`, `Workspace` o `Tenant`.

```typescript
export const tenant = pgTable("tenant", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(), // Para urls tipo app.com/mi-empresa
  plan: text("plan").default("free").notNull(), // Ej: free, pro, enterprise
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
```

## 2. Relación Muchos-a-Muchos (User <-> Tenant)

En la mayoría de los SaaS modernos (como Slack, Notion o GitHub), **un usuario puede pertenecer a varios tenants**. Por eso, necesitamos una tabla intermedia que además defina el **rol** del usuario en ese tenant específico.

```typescript
export const members = pgTable(
  "members",
  {
    id: text("id").primaryKey(),
    tenantId: text("tenant_id")
      .notNull()
      .references(() => tenant.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    role: text("role")
      .$type<"admin" | "member" | "owner">()
      .default("member")
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("members_tenant_idx").on(table.tenantId),
    index("members_user_idx").on(table.userId),
  ],
);
```

## 3. Esquema de Ejemplo para Datos del SaaS

Cualquier tabla de "negocio" que crees a partir de ahora (proyectos, facturas, tareas) **debe** tener una columna `tenantId` para filtrar los datos correctamente.

```typescript
export const project = pgTable(
  "project",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    tenantId: text("tenant_id")
      .notNull()
      .references(() => tenant.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("project_tenant_idx").on(table.tenantId), // Crucial para el rendimiento
  ],
);
```

---

## Esquema Completo con Relaciones

Aquí tienes cómo quedaría el bloque de relaciones actualizado para Drizzle:

```typescript
// ... (Tablas anteriores)

export const tenantRelations = relations(tenant, ({ many }) => ({
  members: many(members),
  projects: many(project),
}));

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  members: many(members), // El usuario ve sus membresías
}));

export const membersRelations = relations(members, ({ one }) => ({
  tenant: one(tenant, {
    fields: [members.tenantId],
    references: [tenant.id],
  }),
  user: one(user, {
    fields: [members.userId],
    references: [user.id],
  }),
}));

export const projectRelations = relations(project, ({ one }) => ({
  tenant: one(tenant, {
    fields: [project.tenantId],
    references: [tenant.id],
  }),
}));
```

---

### Puntos clave que añadí:

1. **Índices (`index`)**: En un multi-tenant, casi todas tus consultas tendrán un `.where(eq(table.tenantId, currentTenantId))`. Sin índices en `tenant_id`, tu base de datos se volverá lenta muy rápido.
2. **Cascada (`onDelete: "cascade"`)**: Si una empresa (tenant) borra su cuenta, esto asegura que se eliminen automáticamente sus miembros y proyectos.
3. **Roles**: La tabla `members` es donde vive la lógica de permisos. No pongas el rol en la tabla `user`, porque un usuario puede ser "Admin" en una empresa y "Lector" en otra.

## Próximos pasos

Cuando agregues nuevas tablas de negocio:

- Copia el patrón de project
- Agrega tenantId referenciando tenant.id
- Crea índice: index().on(table.tenantId)
- Actualiza relaciones en tenantRelations
- Genera migración: npm run drizzle-kit:generate
- Aplica: npm run drizzle-kit:push

**REGLAS IMPORTANTES:**

- 1.  Toda tabla nueva DEBE tener una columna 'tenantId' que referencie a tenant.id
- 2.  Usa 'onDelete: "cascade"' para limpiar automáticamente datos relacionados (esto dependerá de tu modelo de negocio)
- 3.  OBLIGATORIO: Crea un índice en tenantId para optimizar queries: index().on(table.tenantId)
- 4.  En queries, SIEMPRE filtra por tenantId: where(and(eq(table.tenantId, tenantId), ...))
- 5.  Usa el patrón de ejemplo (project) como referencia para nuevas tablas
