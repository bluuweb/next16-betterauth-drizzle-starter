"use client";

import { signout } from "@/lib/actions/register-actions";

const SignOut = () => {
  const handleSignOut = async () => {
    await signout();
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Sign Out
    </button>
  );
};
export default SignOut;
