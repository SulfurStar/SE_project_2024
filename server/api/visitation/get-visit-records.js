import { PrismaClient } from '@prisma/client';
import { getQuery, readBody } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { teacherId } = await readBody(event);

  if (!teacherId) {
    return {
      success: false,
      message: '缺少teacherId',
    };
  }

  try {
    const records = await prisma.visit_record.findMany({
      where: {
        teacherId: parseInt(teacherId, 10)
      }
    });

    return {
      success: true,
      data: records
    };
  } catch (error) {
    console.error('Error fetching visitation records:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching visitation records'
    });
  }
});
