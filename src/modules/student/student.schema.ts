import z from "zod";

export const createStudentSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be atleast 2 characters"),
  lastName: z.string().trim().min(2, "First name must be atleast 2 characters"),
  email: z.email("Invalid email address").trim().toLowerCase(),
  age: z.number().int().min(18, "Student must be least 18 year old"),
});
