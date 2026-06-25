import { z } from "zod";
import { createStudentSchema, updateStudentSchema } from "./student.schema.js";

export type CreateStudentDto = z.infer<typeof createStudentSchema>;
export type UpdateStudentDto = z.infer<typeof updateStudentSchema>;
