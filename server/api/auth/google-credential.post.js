// server/api/auth/google-credential.post.js

import { OAuth2Client } from 'google-auth-library';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const oauth2Client = new OAuth2Client();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event); // 读取请求的body

    const ticket = await oauth2Client.verifyIdToken({
      idToken: body.credential // 验证token
    });

    const payload = ticket.getPayload(); // Google用户信息

    // 验证失败
    if (!payload) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid token'
      });
    }

    // 查询数据库是否有此用户
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (user) {
      // 返回数据库中的用户信息和Google的头像
      return { exists: true, user, avatar: payload.picture };
    } else {
      // 返回Google用户信息以便前端进行进一步处理
      return { exists: false, payload };
    }
  } catch (error) {
    console.error('Error in Google credential API:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    });
  } finally {
    await prisma.$disconnect();
  }
});
