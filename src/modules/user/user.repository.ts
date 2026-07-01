import prisma from "../../database/prisma.js";

export class UserRespository {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
  async findAll(query) {
    const {
      page,
      limit,
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = query;

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
    // todo
  }
}
