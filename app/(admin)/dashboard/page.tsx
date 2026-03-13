import SignOut from "@/app/components/sign-out";
import UserInfoClient from "@/app/components/user-info-client";
import UserInfoProvider from "@/app/components/user-info-provider";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <SignOut />
      <UserInfoProvider />
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <UserInfoClient />
    </div>
  );
};
export default page;
