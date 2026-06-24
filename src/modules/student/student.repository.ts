import prisma from "../../database/prisma.js";
import type { CreateStudentDto } from "./student.types.js";

export class StudentRepository {
  async findAll() {
    return prisma.student.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  async createStudent(data: CreateStudentDto) {
    return prisma.student.create({
      data,
    });
  }
  async findByEmail(email: string) {
    return prisma.student.findUnique({
      where: {
        email,
      },
    });
  }
}
