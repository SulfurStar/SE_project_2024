import { PrismaClient } from '@prisma/client'
import { defineEventHandler, readBody } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { userId, info_student, date_update } = await readBody(event)

  if (!userId || !info_student || !date_update) {
    return {
      success: false,
      message: '缺少必要的字段',
    }
  }

  try {
    const result = await prisma.visit_record.updateMany({
      where: { studentId: parseInt(userId, 10) },
      data: { info_student, date_update },
    })

    if (result.count === 0) {
      return {
        success: false,
        message: '沒有找到匹配的記錄',
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error updating visit record:', error)
    return {
      success: false,
      message: '更新訪視記錄時出錯',
    }
  }
})

