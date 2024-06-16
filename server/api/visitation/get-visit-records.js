import { PrismaClient } from '@prisma/client';
import { readBody } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { teacherId } = await readBody(event);

  try {
    const records = await prisma.visit_record.findMany({
      where: {
        teacherId: parseInt(teacherId, 10)
      },
      include: {
        student: true // 假设 visit_record 表有 studentId 与 User 表关联
      }
    });

    const response = records.map(record => ({
      ...record,
      studentName: record.student.name // 获取学生的名字
    }));

    return {
      success: true,
      data: response
    };
  } catch (error) {
    console.error('Error fetching visitation records:', error);
    return {
      success: false,
      message: 'Error fetching visitation records'
    };
  }
});

