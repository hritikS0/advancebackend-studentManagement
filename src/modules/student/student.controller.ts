import type { Response, Request } from "express";
import { StudentService } from "./student.service.js";
import { createStudentSchema, updateStudentSchema } from "./student.schema.js";
import { AppError } from "../../shared/errors/AppError.js";

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

  async getStudentById(req: Request, res: Response) {
    const id = req.params.id as string;
    const student = await this.studentService.getStudentById(id);
    res.status(200).json({
      success: true,
      data: student,
    });
  }
  async updateStudent(req: Request, res: Response) {
    const id = req.params.id as string;
    const data = updateStudentSchema.parse(req.body);

    const student = await this.studentService.updateStudent(id, data);
    res.status(200).json({
      success: true,
      data: student,
    });
  }
  async deleteStudent(req: Request, res: Response) {
    const id = req.params.id as string;
    const student = this.studentService.deleteStudent(id);
    res.status(200).json({
      success: true,
      message: "Student deleted!!",
    });
  }
}
