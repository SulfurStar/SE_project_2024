import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody, createError } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event); // 读取请求的body
    const { email, name, phone } = body;

    // 创建用户
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        phone,
        role: 'LANDLORD',
      },
    });

    // 返回特定的用户信息
    return {
      exists: true,
      id: newUser.id,
      role: newUser.role,
      sexual: newUser.sexual || null, // Assuming this field might be nullable
      phone: newUser.phone || null, // Assuming this field might be nullable
    };
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
