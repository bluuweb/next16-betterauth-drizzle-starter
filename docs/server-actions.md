# Server Actions + Zod (Patrón recomendado)

## Convención

- Archivo: `app/(ruta)/[file-actions].ts` con `"use server"`
- Schema: `lib/zod/[schema].ts`
- Exportar tipos desde actions:
  - `FormState`
  - `SchemaType` (inferido desde Zod)

## Ejemplo

```ts
// app/(auth)/login/login-actions.ts
"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";
import { loginSchema } from "@/lib/zod/login-schema";

export type SchemaType = z.infer<typeof loginSchema>;

export type FormState = {
  errors?: { email?: string[]; password?: string[] };
  message?: string;
  success?: boolean;
};

export async function login(_: FormState, data: unknown): Promise<FormState> {
  const validated = loginSchema.safeParse(data);

  if (!validated.success) {
    const fieldErrors = validated.error.flatten().fieldErrors;
    return {
      errors: { email: fieldErrors.email, password: fieldErrors.password },
    };
  }

  try {
    await auth.api.signInEmail({
      body: validated.data,
      headers: await headers(),
    });

    return { success: true };
  } catch {
    return { success: false, message: "Invalid credentials" };
  }
}
```
