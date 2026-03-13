"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormState, login } from "@/lib/actions/login-actions";
import { loginSchema, LoginSchemaType } from "@/lib/zod/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const [state, action, pending] = useActionState(login, {} as FormState);

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    startTransition(() => {
      action(data);
    });
  };

  return (
    <article className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <section className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Sign In
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back! Please sign in to your account
          </p>
        </section>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            suppressHydrationWarning
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                      name="email"
                    />
                  </FormControl>
                  <FormMessage />
                  {state?.errors?.email && (
                    <p className="text-sm text-destructive">
                      {state.errors.email}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                      name="password"
                    />
                  </FormControl>
                  <FormMessage />
                  {state?.errors?.password && (
                    <p className="text-sm text-destructive">
                      {state.errors.password}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={pending}
              className="w-full"
            >
              {pending ? "Signing in..." : "Sign In"}
            </Button>

            {state?.message && (
              <p
                className={
                  state.success ? "text-green-500" : "text-destructive"
                }
              >
                {state.message}
              </p>
            )}
          </form>
        </Form>
      </div>
    </article>
  );
};
export default LoginPage;
