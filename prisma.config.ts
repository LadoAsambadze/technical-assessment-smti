// prisma.config.ts
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: "postgresql://USER:PASSWORD@localhost:5432/DB_NAME",
  },
});
