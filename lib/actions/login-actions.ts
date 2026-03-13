"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import { auth } from "../auth";
import { loginSchema, LoginSchemaType } from "../zod/login-schema";

export type FormState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
  success?: boolean;
};

export async function login(_: FormState, data: LoginSchemaType) {
  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);
    return {
      errors: flattened.fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    });
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message:
        (error as { message?: string })?.message ?? "Invalid email or password",
    };
  }

  redirect("/dashboard");
}
