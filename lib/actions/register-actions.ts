"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import * as z from "zod";
import { auth } from "../auth";

const SignupFormSchema = z.object({
  name: z.string().trim().min(2, {
    message: "Name must be at least 2 characters long.",
  }),
  email: z
    .email({
      message: "Please enter a valid email.",
    })
    .toLowerCase(),
  password: z.string().trim().min(6, {
    message: "Be at least 6 characters long",
  }),
});

export type FormState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
  success?: boolean;
};

export const signup = async (prevState: FormState, formData: FormData) => {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);
    return {
      errors: flattened.fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    await auth.api.signUpEmail({
      body: { email, password, name },
    });

    return {
      success: true,
      message:
        "Account created successfully! Please check your email to verify your account.",
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message:
        (error as { message?: string })?.message ?? "Something went wrong",
    };
  }
};

export const signout = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/login");
};
