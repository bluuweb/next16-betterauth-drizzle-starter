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
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { FormState, signup } from "./register-actions";

const SignupFormSchema = z.object({
  name: z.string().trim().min(2, {
    message: "Name must be at least 2 characters long.",
  }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email.",
    })
    .toLowerCase(),
  password: z.string().trim().min(6, {
    message: "Be at least 6 characters long",
  }),
});

export type SignupSchemaType = z.infer<typeof SignupFormSchema>;

const initialState: FormState = {};

const RegisterPage = () => {
  const [state, action, pending] = useActionState(signup, initialState);

  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupSchemaType) => {
    startTransition(() => {
      action(data);
    });
  };

  return (
    <article className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <section className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-gray-600">Sign up to get started</p>
        </section>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            suppressHydrationWarning
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      type="text"
                      {...field}
                      name="name"
                    />
                  </FormControl>
                  <FormMessage />
                  {state?.errors?.name && (
                    <p className="text-sm text-destructive">
                      {state.errors.name}
                    </p>
                  )}
                </FormItem>
              )}
            />

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
              {pending ? "Creating account..." : "Sign Up"}
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
export default RegisterPage;
