"use client";

import type { FormState } from "@/lib/actions/register-actions";
import { signup } from "@/lib/actions/register-actions";
import { useActionState } from "react";

const initialState: FormState = {};

const RegisterForm = () => {
  const [state, action, pending] = useActionState(signup, initialState);

  return (
    <form action={action}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          placeholder="Name"
          className="border-2"
        />
      </div>

      {state?.errors?.name && (
        <p className="text-red-500">{state.errors.name}</p>
      )}

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          placeholder="Email"
          className="border-2"
        />
      </div>
      {state?.errors?.email && (
        <p className="text-red-500">{state.errors.email}</p>
      )}

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="border-2"
        />
      </div>
      {state?.errors?.password && (
        <p className="text-red-500">{state.errors.password}</p>
      )}

      <button
        disabled={pending}
        type="submit"
        className="bg-amber-300"
      >
        Sign Up
      </button>

      {state?.message && (
        <p className={state.success ? "text-green-500" : "text-red-500"}>
          {state.message}
        </p>
      )}
    </form>
  );
};
export default RegisterForm;
