import { PrismaClient } from '@prisma/client';
import { getQuery } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { teacherId } = getQuery(event);

  try {
    const records = await prisma.visit_record.findMany({
      where: { teacherId: parseInt(teacherId, 10) },
    });

    return records;
  } catch (error) {
    console.error('Error fetching visitation records:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching visitation records',
    });
  }
});
