import { PrismaClient } from '@prisma/client';
import { getQuery } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const userId = parseInt(query.userId, 10);

  if (isNaN(userId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid user ID',
    });
  }

  try {
    const adverts = await prisma.advertise.findMany({
      where: {
        authorId: userId,
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
