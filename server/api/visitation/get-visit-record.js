// /api/visitation/get-visit-record.post.js
import { PrismaClient } from '@prisma/client'
import { defineEventHandler, readBody } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { studentId } = await readBody(event)
  
  if (!studentId) {
    return {
      success: false,
      message: '缺少學生ID',
    }
  }

  try {
    const visitRecord = await prisma.visit_record.findUnique({
      where: { studentId: parseInt(studentId, 10) },
    })

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
      message: '獲取訪視記錄時出錯',
    }
  }
})
