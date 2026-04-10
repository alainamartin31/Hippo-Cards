import "dotenv/config";
import { defineConfig, env } from "@prisma/config";

export default defineConfig({
  datasource: {
    db: {
      provider: "sqlite",
      url: env("DATABASE_URL"),
    },
  },
  generators: {
    client: {
      provider: "prisma-client-js",
    },
  },
});
