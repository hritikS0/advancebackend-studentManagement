import { AppError } from "../../shared/errors/AppError.js";
import { StudentRepository } from "./student.repository.js";
import type { CreateStudentDto, UpdateStudentDto } from "./student.types.js";

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
  async getStudentById(id: string) {
    const student = await this.studentRepository.findById(id);
    if (!student) {
      throw new AppError(404, "Student not found");
    }
    return student;
  }
  async updateStudent(id: string, data: UpdateStudentDto) {
    const student = await this.studentRepository.findById(id);
    if (!student) {
      throw new AppError(404, "Student not found");
    }
    return this.studentRepository.update(id, data);
  }
  async deleteStudent(id: string) {
    const student = await this.studentRepository.findById(id);
    if (!student) {
      throw new AppError(404, "Student not found");
    }
    return this.studentRepository.delete(id);
  }
}
