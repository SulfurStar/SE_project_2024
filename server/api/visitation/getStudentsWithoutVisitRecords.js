import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const students = await prisma.user.findMany({
      where: {
        role: 'STUDENT',
        id: {
          notIn: (
            await prisma.visit_record.findMany({
              select: { studentId: true }
            })
          ).map(record => record.studentId)
        }
      },
      select: {
        id: true,
        name: true
      }
    });

    return {
      success: true,
      data: students
    };
  } catch (error) {
    console.error('Error fetching students without visit records:', error);
    return {
      success: false,
      message: 'Error fetching students without visit records'
    };
  }
});



