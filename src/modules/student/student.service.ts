import { AppError } from "../../shared/errors/AppError.js";
import { StudentRepository } from "./student.repository.js";
import type { CreateStudentDto } from "./student.types.js";

export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}
  async getStudents() {
    return this.studentRepository.findAll();
  }
  async createStudent(data: CreateStudentDto) {
    const existingStudent = await this.studentRepository.findByEmail(
      data.email,
    );
    if (existingStudent) {
      throw new AppError(409, "Email Already exists");
    }
    return this.studentRepository.createStudent(data);
  }
}
