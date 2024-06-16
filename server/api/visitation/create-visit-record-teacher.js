import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { studentId, teacherId, infoTeacher } = await readBody(event);

  // if (!Id || !info_teacher || !date_update) {
  //   return {
  //     success: false,
  //     message: '缺少必要的字段',
  //   };
  // }

  try {
    const result = await prisma.visit_record.create({ 
      data: { 
        studentId: parseInt(studentId, 10),
        teacherId: parseInt(teacherId, 10),
        info_teacher: infoTeacher,
        date_update: new Date(),
      },
    });

    if (result.count === 0) {
      return {
        success: false,
        message: '沒有找到匹配的記錄',
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error updating visit record:', error);
    return {
      success: false,
      message: '更新訪視記錄時出錯',
    };
  }
});


