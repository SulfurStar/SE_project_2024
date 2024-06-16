import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { studentId, teacherId } = await readBody(event);

  if (!studentId || !teacherId) {
    return {
      success: false,
      message: '缺少必要的字段',
    };
  }

  try {
    const date_create = new Date();
    const date_update = date_create;

    const newRecord = await prisma.visit_record.create({
      data: {
        studentId: parseInt(studentId, 10),
        teacherId: parseInt(teacherId, 10),
        date_create,
        date_update,
      },
    });

    return {
      success: true,
      recordId: newRecord.id,
    };
  } catch (error) {
    console.error('Error creating visit record:', error);
    return {
      success: false,
      message: '創建訪視記錄時出錯',
    };
  }
});
