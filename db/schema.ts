import { boolean, index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

/**
 * ========================================
 * ESQUEMA MULTI-TENANT - PLANTILLA
 * ========================================
 *
 * Este esquema está diseñado para soportar Multi-Tenant (aislamiento a nivel de fila).
 * Estrategia: Shared Schema - Todas las tablas de negocio tienen una columna 'tenantId'
 *
 * REGLAS IMPORTANTES:
 * 1. Toda tabla nueva DEBE tener una columna 'tenantId' que referencie a tenant.id
 * 2. Usa 'onDelete: "cascade"' para limpiar automáticamente datos relacionados
 * 3. OBLIGATORIO: Crea un índice en tenantId para optimizar queries: index().on(table.tenantId)
 * 4. En queries, SIEMPRE filtra por tenantId: where(and(eq(table.tenantId, tenantId), ...))
 * 5. Usa el patrón de ejemplo (project) como referencia para nuevas tablas
 */

// ============================================
// TABLAS DE AUTENTICACIÓN (Better Auth)
// ============================================

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

// ============================================
// TABLAS MULTI-TENANT
// ============================================

/**
 * TENANT (Organización/Workspace)
 * Representa la organización o empresa que agrupa a los usuarios
 * En un SaaS, esto es equivalente a Organization, Workspace, Team, etc.
 */
export const tenant = pgTable("tenant", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(), // Para URLs tipo app.com/workspace-slug
  plan: text("plan").default("free").notNull(), // ej: free, pro, enterprise
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

/**
 * MEMBERS (Relación Usuario <-> Tenant)
 * Tabla intermedia que permite que un usuario pertenezca a múltiples tenants
 * con diferentes roles en cada uno (ej: Admin en una empresa, Member en otra)
 *
 * IMPORTANTE: La lógica de permisos vive aquí (role), NO en la tabla user
 */
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

// ============================================
// TABLAS DE NEGOCIO (EJEMPLOS - ADAPTAR A TU PROYECTO)
// ============================================

/**
 * PROYECTO (EJEMPLO)
 * Este es un ejemplo de cómo estructurar cualquier tabla de negocio en un esquema multi-tenant
 *
 * PATRÓN A SEGUIR PARA NUEVAS TABLAS:
 * 1. Agregar columna: tenantId (references tenant.id con onDelete: "cascade")
 * 2. Agregar índice: index().on(table.tenantId) para mejorar performance
 * 3. En queries: Usar filter(and(eq(table.tenantId, tenantId), ...)) SIEMPRE
 *
 * ADAPTACIONES:
 * - Renombra "project" por tu entidad (invoice, task, document, etc.)
 * - Cambia los campos según tu dominio (description, status, etc.)
 * - Agrega las relaciones necesarias a otras tablas
 */

export const project = pgTable(
  "project",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    // REQUERIDO: Columna tenantId para aislar datos por tenant
    tenantId: text("tenant_id")
      .notNull()
      .references(() => tenant.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    // REQUERIDO: Índice en tenantId (crucial para performance en multi-tenant)
    index("project_tenant_idx").on(table.tenantId),
    // OPCIONAL: Índices adicionales según tus queries
    // index("project_tenant_created_idx").on(table.tenantId, table.createdAt),
  ],
);

export type Project = typeof project.$inferSelect;
export type NewProject = typeof project.$inferInsert;

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
