import { db } from "@/db"; // your drizzle instance
import * as schema from "@/db/schema"; // your drizzle schema
import { betterAuth } from "better-auth";
import { localization } from "better-auth-localization";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  plugins: [
    localization({
      defaultLocale: "es-ES", // Use built-in Spanish translations
      fallbackLocale: "default", // Fallback to English
    }),
    nextCookies(),
  ],
});
