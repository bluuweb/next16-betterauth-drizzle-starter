# Copilot Instructions para Next.js 16 + Better Auth + Drizzle ORM

Estas instrucciones definen el contexto y las mejores prácticas para trabajar en este proyecto.

## Stack Principal

- **Framework**: Next.js 16 (App Router)
- **Autenticación**: Better Auth
- **ORM**: Drizzle ORM
- **Base de Datos**: NeonDB (PostgreSQL Serverless)
- **Lenguaje**: TypeScript
- **Componentes UI**: ShadCN UI
- **Formularios**: React Hook Form + Zod

## MCP Configuration

Este proyecto utiliza **Next.js MCP Server** (`.mcp.json`) para que tengas acceso en tiempo real a:

- Errores de build, runtime y type errors
- Información de estado de la aplicación
- Metadata de páginas y componentes
- Server Actions e jerarquía de componentes
- Logs del servidor de desarrollo

## Recursos Oficiales (SIEMPRE consultar primero)

### Next.js 16

- Documentación oficial: https://nextjs.org/docs
- App Router: https://nextjs.org/docs/app
- Server Actions: https://nextjs.org/docs/app/guides/forms
- MCP Server: https://nextjs.org/docs/app/guides/mcp

### Drizzle ORM

- Documentación oficial: https://orm.drizzle.team/docs/overview
- PostgreSQL: https://orm.drizzle.team/docs/get-started-postgresql
- Migrations: https://orm.drizzle.team/docs/drizzle-kit/overview
- Queries: https://orm.drizzle.team/docs/select

### Better Auth

- Documentación oficial: https://www.better-auth.com
- Setup: https://www.better-auth.com/docs/installation
- API Reference: https://www.better-auth.com/docs/api-reference/auth
- Drizzle Adapter: https://www.better-auth.com/docs/adapters/drizzle

### ShadCN + React Hook Form

- ShadCN Docs: https://ui.shadcn.com
- React Hook Form: https://react-hook-form.com
- Form Component: https://ui.shadcn.com/docs/components/form

## Patrones de Proyecto

### 1. Autenticación y Sessions

**En Client Components:**

```typescript
"use client";

import { useSession } from "@/lib/auth-client";

const MyComponent = () => {
  const { user, session } = useSession();

  // Usar user, session aquí
};
```

**En Server Components:**

```typescript
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Usar session aquí
};
```

### 2. Server Actions (Formularios)

**Estructura recomendada:**

- Archivo: `app/(ruta)/[file-actions].ts` con `"use server"`
- Validación: Zod schemas en `lib/zod/[schema].ts`
- Tipos: Exportar `FormState` y `SchemaType` desde actions

**Ejemplo:**

```typescript
// app/(auth)/login/login-actions.ts
"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { loginSchema } from "@/lib/zod/login-schema";

export type FormState = {
  errors?: { email?: string[]; password?: string[] };
  message?: string;
  success?: boolean;
};

export async function login(_: FormState, data: any) {
  const validatedFields = loginSchema.safeParse(data);
  if (!validatedFields.success) {
    return { errors: z.flattenError(validatedFields.error).fieldErrors };
  }

  try {
    await auth.api.signInEmail({
      body: validatedFields.data,
      headers: await headers(),
    });
  } catch (error) {
    return { success: false, message: "Invalid credentials" };
  }
}
```

### 3. Formularios con React Hook Form + ShadCN

**En Page Component (`"use client"`):**

```typescript
"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "./login-actions";
import { loginSchema } from "@/lib/zod/login-schema";

const LoginPage = () => {
  const [state, action, pending] = useActionState(login, {});
  const form = useForm({ resolver: zodResolver(loginSchema) });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => action(data))}>
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" disabled={pending}>Sign In</Button>
        {state?.message && <p className={state.success ? "text-green-500" : "text-red-500"}>{state.message}</p>}
      </form>
    </Form>
  );
};
```

### 4. Estructura de Carpetas

```
/app                    → Rutas y layouts solamente
/components             → Componentes reutilizables (UI)
/providers              → Context providers
/lib
  /auth-client.ts       → Cliente de Better Auth
  /auth.ts              → Configuración de Better Auth
  /actions              → Server actions
  /zod                  → Schemas de validación
/db
  /index.ts             → Conexión a Drizzle
  /schema.ts            → Esquema de BD
```

### 5. Drizzle ORM Usage

**Queries (Con Builder Pattern - Recomendado)**

## Reglas Críticas

1. ✅ **Siempre usar alias `@/`** en imports - nunca rutas relativas
2. ✅ **Validación con Zod** en todos los server actions
3. ✅ **Tipos exportables** desde server actions (FormState, SchemaType)
4. ✅ **"use client"** solo cuando necesites hooks de React
5. ✅ **"use server"** en actions files
6. ✅ **Headers y contexto de autenticación** en server components/actions
7. ✅ **useSession() de Better Auth** en client components para sesión
8. ✅ **Consultar documentación oficial** antes de implementar

## Consultas Frecuentes

**¿Cómo obtengo la sesión del usuario?**

- Client: `const { user } = useSession()` (from `@/lib/auth-client`)
- Server: `await auth.api.getSession({ headers: await headers() })`

**¿Cómo valido datos?**

- Crear schema en `lib/zod/[name]-schema.ts`
- Usar `schema.safeParse()` en server actions
- Retornar errores en `FormState`

**¿Cómo manejo migraciones?**

- `npm run drizzle-kit:generate` → Crear migración
- `npm run drizzle-kit:push` → Aplicar a BD
- `npm run drizzle:studio` → Ver datos

**¿Dónde pongo componentes?**

- `/components` → Componentes reutilizables
- `/app` → Layouts y pages solamente
- `/providers` → Context providers

## Notas Importantes

- Este proyecto usa **Next.js 16+ MCP**, así que tengo acceso a errores en tiempo real
- Los **Server Actions** son la forma preferida para manejar formularios
- **Better Auth + Drizzle** están integrados para sesiones y usuarios
- **NeonDB** proporciona PostgreSQL serverless (no olvidar `DATABASE_URL`)
