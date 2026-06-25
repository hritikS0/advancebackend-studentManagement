import type { Response, Request } from "express";
import { StudentService } from "./student.service.js";
import { sendResponse } from "../../shared/utils/sendResponse.js";
import type { StudentQuery } from "./student.types.js";

export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  async getStudent(req: Request, res: Response) {
    const page = Number(req.query.page as string) || 1;
    const limit = Number(req.query.limit as string) || 100;
    const search = req.query.search ? String(req.query.search) : "";

    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sortOrder =
      (req.query.sortOrder as string) === "asc" ? "asc" : "desc";
    const query: StudentQuery = {
      page,
      limit,
      search,
      sortBy,
      sortOrder,
    };
    const students = await this.studentService.getStudents(query);
    sendResponse({ res, statusCode: 200, success: true, data: students });
  }
  async createStudent(req: Request, res: Response) {
    const student = await this.studentService.createStudent(req.body);
    sendResponse({
      res,
      statusCode: 201,
      success: true,
      message: "Student created successfully",
      data: student,
    });
  }

  async getStudentById(req: Request, res: Response) {
    const id = req.params.id as string;
    const student = await this.studentService.getStudentById(id);
    sendResponse({ res, statusCode: 200, success: true, data: student });
  }
  async updateStudent(req: Request, res: Response) {
    const id = req.params.id as string;
    const student = await this.studentService.updateStudent(id, req.body);
    sendResponse({ res, statusCode: 200, success: true, data: student });
  }
  async deleteStudent(req: Request, res: Response) {
    const id = req.params.id as string;
    await this.studentService.deleteStudent(id);
    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: "Student deleted!!",
    });
  }
}
