import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { teacherId, studentId, date_create } = await readBody(event);

  if (!teacherId || !studentId || !date_create) {
    return {
      success: false,
      message: '缺少必要的字段',
    };
  }

  try {
    const newRecord = await prisma.visit_record.create({
      data: {
        teacherId,
        studentId,
        date_create,
        date_update: date_create,
      },
    });

    return {
      success: true,
      data: newRecord,
    };
  } catch (error) {
    console.error('Error creating visit record:', error);
    return {
      success: false,
      message: '创建访视记录时出错',
    };
  }
});
