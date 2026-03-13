"use client";

import { signIn } from "@/lib/auth-client";
import { useTransition } from "react";

const LoginPage = () => {
  const [isPending, startTransition] = useTransition();

  const handleClickSignIn = () => {
    startTransition(async () => {
      await signIn.email({
        email: "test@test.com",
        password: "123123",
        callbackURL: "/dashboard",
      });
    });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button
        disabled={isPending}
        onClick={handleClickSignIn}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};
export default LoginPage;
