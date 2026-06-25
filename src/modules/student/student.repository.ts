import prisma from "../../database/prisma.js";
import type {
  CreateStudentDto,
  StudentQuery,
  UpdateStudentDto,
} from "./student.types.js";

export class StudentRepository {
  async findAll(query: StudentQuery) {
    const { page, limit, search, sortBy, sortOrder } = query;
    const skip = (page - 1) * limit;
    console.log(sortBy);
    console.log(sortOrder);

    const where = search
      ? {
          OR: [
            {
              firstName: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              lastName: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {};
    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),
      prisma.student.count({
        where,
      }),
    ]);
    return {
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      data: students,
    };
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
