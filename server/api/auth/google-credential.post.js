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
      const userData = {
        exists: true,
        id: user.id,
        avatar: payload.picture,
        email: user.email,
        role: user.role,


      };
      switch (user.role) {
        case 'ADMIN':
          return userData;
        case 'STUDENT':
          return {
            ...userData,
            name: payload.name,
            sexual: user.sexual,
            phone: user.phone,
            homeAddress: user.homeAddress,
            homeTel: user.homeTel,
            emergencyContact: user.emergencyContact,
            emergencyContactNumber: user.emergencyContactNumber,
            studentID: user.studentID,
            grade: user.grade,
            teacher: user.teacher,
          };
        case 'TEACHER':
          return {
            ...userData,
            name: user.name,
            sexual: user.sexual,
            phone: user.phone,
            jobTitle: user.jobTitle,
            officeTel: user.officeTel,
            officeAddress: user.officeAddress,
          };
        case 'LANDLORD':
          return {
            ...userData,
            name: user.name,
            sexual: user.sexual,
            phone: user.phone,
          };
        default:
          return {
            ...userData,
            name: user.name,
            sexual: user.sexual,
            phone: user.phone,
          };
      }
    } else {
      // 返回Google用户信息以便前端进行进一步处理
      return {
        exists: false,
        avatar: payload.picture,
        email: payload.email,
        name: payload.name,
      };
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
