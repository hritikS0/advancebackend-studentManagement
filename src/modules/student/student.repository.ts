import prisma from "../../database/prisma.js";
import type { CreateStudentDto, UpdateStudentDto } from "./student.types.js";

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
  async findById(id: string) {
    return prisma.student.findUnique({
      where: {
        id,
      },
    });
  }
  async update(id: string, data: UpdateStudentDto) {
    // filter out the undefined enteries
    const updateData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined),
    );
    return prisma.student.update({
      where: { id },
      data: updateData,
    });
  }
  async delete(id: string) {
    return prisma.student.delete({
      where: { id },
    });
  }
}
