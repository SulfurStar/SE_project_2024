// /api/visitation/get-visit-record.js
import { PrismaClient } from '@prisma/client';
import { getQuery, readBody } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  try {
    const record = await prisma.visit_record.findMany({
      where: { studentId: parseInt(id, 10) },
    });

    if (!record) {
      return {
        success: false,
        message: '找不到該訪視紀錄',
      };
    }

    return {
      success: true,
      data: record,
    };
  } catch (error) {
    console.error('Error fetching visitation record:', error);
    return {
      success: false,
      message: '獲取訪視紀錄時出錯',
    };
  }
});
