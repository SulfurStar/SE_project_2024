// api/update-visit-time.post.js
import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const visitData = await readBody(event);

  if (!visitData.visitTableId) {
    throw new Error('visit Table Id is required');
  }
  if (!visitData.visitTime) {
    throw new Error('Visit time is required');
  }

  try {
    const updatedVisit = await prisma.visit_table.update({
      where: { id: parseInt(visitData.visitTableId) },
      data: { visit_date: visitData.visitTime },
    });

    return {
      success: true,
      data: updatedVisit,
    };
  } catch (error) {
    console.error('Error updating visit time:', error);
    return {
      success: false,
      message: 'Failed to update visit time',
      error: error.message,
    };
  }
});
