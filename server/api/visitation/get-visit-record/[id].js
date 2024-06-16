import { PrismaClient } from '@prisma/client'
import { defineEventHandler } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { id } = event.context.params; // 获取动态路由参数中的id
  console.log(`Fetching visit record for student ID: ${id}`); // 调试输出

  try {
    const visitRecord = await prisma.visit_record.findFirst({
      where: {
        studentId: parseInt(id, 10),
      },
    });

    if (!visitRecord) {
      return {
        success: false,
        message: '沒有找到匹配的記錄',
      }
    }

    return {
      success: true,
      data: visitRecord,
    }
  } catch (error) {
    console.error('Error fetching visit record:', error)
    return {
      success: false,
      message: '获取訪視記錄时出错',
    }
  }
})


