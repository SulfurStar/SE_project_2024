// server/api/getUserData/[id].js
// 用來獲取指定user資料
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default eventHandler(async (event) => {
  const userId = event.context.params.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId, 10) },
    });
    
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      });
    }

    return user;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching user data',
    });
  }
});
