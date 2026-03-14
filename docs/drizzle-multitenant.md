# Drizzle ORM + Multi-tenant (REGLAS)

## Tablas nuevas

- Deben incluir `tenantId` referenciando `tenant.id`
- Deben incluir índice en `tenantId`
- Usar `onDelete: "cascade"` cuando corresponda

## Querying (obligatorio)

Siempre filtrar por `tenantId`:

```ts
import { and, eq } from "drizzle-orm";

// where(and(eq(table.tenantId, tenantId), ...))
```

## Checklist para PRs

- [ ] Tabla tiene `tenantId`
- [ ] FK a `tenant.id`
- [ ] `index().on(table.tenantId)`
- [ ] Queries filtran por tenantId
