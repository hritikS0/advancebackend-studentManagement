import type { Response, Request } from "express";
import { StudentService } from "./student.service.js";
import { createStudentSchema } from "./student.schema.js";

export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  async getStudent(req: Request, res: Response) {
    const student = await this.studentService.getStudents();
    res.status(200).json({
      success: true,
      data: student,
    });
  }
  async createStudent(req: Request, res: Response) {
    const validateData = createStudentSchema.parse(req.body);
    const student = await this.studentService.createStudent(validateData);
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  }
}
