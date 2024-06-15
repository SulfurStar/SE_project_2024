import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const userData = await readBody(event);
    delete userData.exists;
    delete userData.avatar;

    // 确保传入的数据包含用户 email
    if (!userData.email) {
      throw new Error('User email is required');
    }

    // 检查并转换 grade 字段的值
    if (userData.grade) {
      userData.grade = parseInt(userData.grade, 10);
      if (isNaN(userData.grade)) {
        throw new TypeError('Invalid grade value');
      }
    }

    try {
      // 从数据库中获取现有的用户数据
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (!existingUser) {
        throw new Error('User not found');
      }

      // 更新用户资料
      const updatedUser = await prisma.user.update({
        where: { email: userData.email },
        data: userData, 
      });

      return {
        success: true,
        data: updatedUser,
      };
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new Error('Failed to update profile');
    }
});