"use client";

import SignOut from "@/components/sign-out";
import UserInfoProvider from "@/components/user-info-provider";
import { useSession } from "@/lib/providers/session-provider";

const DashboardPage = () => {
  const session = useSession();

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <SignOut />
      <UserInfoProvider />
    </div>
  );
};
export default DashboardPage;
