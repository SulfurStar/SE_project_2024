import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const recordId = event.context.params.id;

  try {
    const deletedRecord = await prisma.visit_record.delete({
      where: { id: parseInt(recordId, 10) },
    });

    return {
      success: true,
      data: deletedRecord,
    };
  } catch (error) {
    console.error('Error deleting visitation record:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete visitation record',
    });
  }
});
