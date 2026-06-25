import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string(),
  NODE_ENV: z.string(),
  DATABASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);
