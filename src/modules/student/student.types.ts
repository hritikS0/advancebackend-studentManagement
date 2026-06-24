import { z } from "zod";
import { createStudentSchema } from "./student.schema.js";

export type CreateStudentDto = z.infer<typeof createStudentSchema>;
