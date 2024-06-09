import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event); // 读取请求的body
    const { email, name } = body;


    // 创建用户
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        role: 'LANDLORD',
      },
    });

    return newUser;
  } catch (error) {
    console.error('Error in register API:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    });
  } finally {
    await prisma.$disconnect();
  }
});