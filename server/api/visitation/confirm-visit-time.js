// api/update-visit-time.post.js
import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const visitData = await readBody(event);

  if (!visitData.studentId) {
    throw new Error('Student ID is required');
  }
  if (!visitData.visit_time) {
    throw new Error('Visit time is required');
  }

  try {
    const updatedVisit = await prisma.visit_table.update({
      where: { teacherId: visitData.teacherId },
      data: { visit_time: visitData.visit_time },
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
