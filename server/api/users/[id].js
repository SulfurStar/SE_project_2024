// server/api/users/[id].js
//用來刪除user
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default eventHandler(async (event) => {
  const userId = event.context.params.id;

  try {
    await prisma.user.delete({
      where: { id: parseInt(userId) },
    });
    return { message: 'User deleted successfully' };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error deleting user',
    });
  }
});
