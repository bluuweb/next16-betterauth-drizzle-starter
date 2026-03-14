# Copilot Instructions (Next.js App Router + Better Auth + Drizzle)

## TL;DR (Reglas INNEGOCIABLES)

1. **Imports**: usar siempre alias `@/` (nunca rutas relativas).
2. **Server Actions**:
   - Archivos de actions deben tener `"use server"`.
   - **Validar SIEMPRE con Zod** (`schema.safeParse()`).
   - Exportar tipos desde actions: `FormState` y `SchemaType`.
3. **Client vs Server Components**:
   - `"use client"` solo si usas hooks/event handlers.
   - En Client: sesión con `useSession()` desde `@/lib/auth-client`.
   - En Server: sesión/usuario con `getSession()`/`getUser()` desde `@/lib/auth/auth-utils`.
4. **Multi-tenant (OBLIGATORIO)**:
   - Toda tabla nueva debe tener `tenantId` que referencia `tenant.id`.
   - Crear índice para `tenantId`: `index().on(table.tenantId)`.
   - En queries **SIEMPRE** filtrar por `tenantId`:
     `where(and(eq(table.tenantId, tenantId), ...))`
   - Usar `onDelete: "cascade"` cuando aplique al modelo de negocio.
   - Usar el patrón de referencia **(project)** para nuevas tablas (si existe en el repo).
5. **Autenticación**:
   - En server actions/components, usar `headers()` cuando se requiera contexto de auth.

---

## Stack Principal

- Framework: **Next.js (App Router)**
- Auth: **Better Auth**
- ORM: **Drizzle ORM**
- DB: **NeonDB (PostgreSQL Serverless)**
- Language: **TypeScript**
- UI: **ShadCN UI**
- Forms: **React Hook Form + Zod**

---

## Estructura de Carpetas (Convención)

- `/app` → rutas y layouts solamente
- `/components` → componentes reutilizables (UI)
- `/providers` → context providers
- `/lib`
  - `auth-client.ts` → cliente Better Auth
  - `auth.ts` → config Better Auth
  - `actions/` → server actions
  - `zod/` → schemas
- `/db`
  - `index.ts` → conexión Drizzle
  - `schema.ts` → schema BD

---

## MCP Configuration

Este proyecto usa **Next.js MCP Server** (`.mcp.json`) para acceso a:

- build/runtime/type errors
- metadata de páginas/componentes
- Server Actions y jerarquía de componentes
- logs de dev server

---

## Referencias rápidas (ver docs para ejemplos completos)

- Auth (client/server): `docs/auth.md`
- Server Actions + Zod: `docs/server-actions.md`
- Formularios RHF + ShadCN: `docs/forms-rhf-shadcn.md`
- Drizzle + Multi-tenant: `docs/drizzle-multitenant.md`
- Links oficiales: `docs/official-links.md`
