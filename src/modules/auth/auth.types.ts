import { z } from "zod";
import { loginSchema, registerSchema } from "./auth.schema.js";

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
