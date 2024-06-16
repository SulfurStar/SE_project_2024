import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = event.context.params; // 获取动态路由参数中的id
  console.log(`Fetching visit record for student ID: ${id}`); // 调试输出
  try {
    const visitRecord = await prisma.Visit_record.findFirst({
      where: {
        studentId: parseInt(id), // 将id转换为整数类型
      },
    });

    if (visitRecord) {
      return {
        success: true,
        data: visitRecord,
      };
    } else {
      return {
        success: false,
        message: 'Record not found',
      };
    }
  } catch (error) {
    console.error('Error fetching visit record:', error);
    return {
      success: false,
      message: 'Failed to fetch visit record',
    };
  }
});

