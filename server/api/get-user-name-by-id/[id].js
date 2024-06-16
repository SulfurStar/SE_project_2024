import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default eventHandler(async (event) => {
    const userId = event.context.params.id;
    console.log('userId:', userId);

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: { name: true },
    });

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      });
    }

    return { name: user.name };
  } catch (error) {
    console.error('Error fetching user name:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching user name',
    });
  }
});