# Formularios (React Hook Form + ShadCN)

## Patrón

- Componente client con `useActionState`
- `react-hook-form` + `zodResolver`
- UI con ShadCN `Form*`

## Ejemplo mínimo

```tsx
"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { login } from "./login-actions";
import { loginSchema } from "@/lib/zod/login-schema";
import type { z } from "zod";

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [state, action, pending] = useActionState(login, {});
  const form = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => action(data))}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={pending}
        >
          Sign In
        </Button>

        {state?.message ? (
          <p className={state.success ? "text-green-500" : "text-red-500"}>
            {state.message}
          </p>
        ) : null}
      </form>
    </Form>
  );
}
```
