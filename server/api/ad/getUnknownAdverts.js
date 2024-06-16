// 獲取未審查的廣告
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const adverts = await prisma.advertise.findMany({
      where: {
        verify: 'UNKNOWN',
      },
    });

    return adverts;
  } catch (error) {
    console.error('Error fetching adverts:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching adverts',
    });
  }
});
