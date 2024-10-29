import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
});

export const env = envSchema.parse(Bun.env);

declare module "bun" {
  interface Env extends z.infer<typeof envSchema> {}
}
