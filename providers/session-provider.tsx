"use client";

import { auth } from "@/lib/auth";
import { createContext, useContext } from "react";

type Session = typeof auth.$Infer.Session;

const SessionContext = createContext<Session | null>(null);

export default function SessionProvider({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === null) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
