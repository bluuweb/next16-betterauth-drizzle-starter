"use client";

import { useSession } from "@/lib/auth-client";

const UserInfoClient = () => {
  const session = useSession();

  return (
    <div className="border-2 border-amber-500">
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};
export default UserInfoClient;
