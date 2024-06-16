import { PrismaClient } from '@prisma/client';
import { getQuery } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { studentId } = getQuery(event);

  try {
    const records = await prisma.visit_record.findFirst({
      where: { 
        studentId: parseInt(studentId, 10) 
      },
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
