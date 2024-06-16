import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // 读取请求体
  const { ids } = body; // 假设请求体中包含一个 `ids` 数组

  try {
    // 删除广告
    await prisma.advertise.deleteMany({
      where: {
        id: {
          in: ids.map(id => parseInt(id, 10)) // 确保ID是整数
        }
      }
    });

    return { message: 'Adverts deleted successfully' };
  } catch (error) {
    console.error('Error deleting adverts:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error deleting adverts',
    });
  }
});
