"use client";

import { useSession } from "@/lib/providers/session-provider";

const UserInfoProvider = () => {
  const { user } = useSession();

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};
export default UserInfoProvider;
