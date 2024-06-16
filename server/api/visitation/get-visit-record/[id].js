// api/get-students.post.js
import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const  studentId  = event.context.params.id;

  if (!teacherId) {
    throw new Error('Teacher ID is required');
  }

  try {
    const visits = await prisma.visit_record.findUnique({
      where: { studentId: parseInt(studentId, 10) },
    });

    console.log('Queried visits:', visits); // 打印查询结果进行调试

    return {
      success: true,
      data: visits
    };
  } catch (error) {
    console.error('Error fetching visits:', error);
    return {
      success: false,
      message: 'Failed to fetch visits',
      error: error.message,
    };
  }
});
