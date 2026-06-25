import { z } from "zod";
import { createStudentSchema, updateStudentSchema } from "./student.schema.js";

export type CreateStudentDto = z.infer<typeof createStudentSchema>;
export type UpdateStudentDto = z.infer<typeof updateStudentSchema>;
export interface StudentQuery {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
