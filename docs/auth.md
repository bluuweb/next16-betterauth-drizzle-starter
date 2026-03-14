# Auth (Better Auth)

## Client Components

```ts
"use client";

import { useSession } from "@/lib/auth-client";

export function MyComponent() {
  const { user, session } = useSession();
  // usar user/session aquí
  return null;
}
```

## Server Components

```ts
import { getSession, getUser } from "@/lib/auth/auth-utils";

const session = await getSession();
const user = await getUser();
```

## Nota

En server actions/components, si la API de Better Auth lo requiere, proveer contexto con:

```ts
import { headers } from "next/headers";
const h = await headers();
```
