import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const teachers = await prisma.user.findMany({
      where: { role: 'Teacher' },
    });

    return teachers;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching teachers',
    });
  }
});
