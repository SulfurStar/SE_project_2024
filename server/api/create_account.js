import { PrismaClient } from '@prisma/client';
import { defineEventHandler, createError, readBody } from 'h3';

const prisma = new PrismaClient();

prisma.$connect()
  .then(() => console.log('Prisma connected successfully'))
  .catch(err => {
    console.error('Error connecting to Prisma:', err);
  });

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event); // 獲取請求體中的數據
    const users = body;

    const createdUsers = [];
    for (const user of users) {
      const { email, name, role } = user;

      // 檢查用戶是否已存在
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      // 如果用戶不存在，創建新用戶
      if (!existingUser) {
        const newUser = await prisma.user.create({
          data: {
            email,
            name,
            role,
          },
        });
        createdUsers.push(newUser);
      }
    }

    return createdUsers; // 返回已創建的用戶數據
  } catch (error) {
    console.error('Error in create_accounts API', error);

    throw createError({
      statusCode: 500,
      statusMessage: `Internal Server Error: ${error.message}`,
    });
  } finally {
    await prisma.$disconnect(); // 確保 Prisma 連接在操作完成後關閉
  }
});