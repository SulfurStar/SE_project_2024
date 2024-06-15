// 用來提供admin_edit_user儲存修改
import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const userData = await readBody(event);

  // 刪除不需要更新的字段
  delete userData.exists;
  delete userData.avatar;

  // 確保傳入的數據包含用戶 ID
  if (!userData.id) {
    throw new Error('User ID is required');
  }
  // 确保传入的数据包含用户 email
  if (!userData.email) {
    throw new Error('User email is required');
  }

  // 檢查並轉換 grade 字段的值
  if (userData.grade) {
    userData.grade = parseInt(userData.grade, 10);
    if (isNaN(userData.grade)) {
      throw new TypeError('Invalid grade value');
    }
  }

  try {
    // 從數據庫中獲取現有的用戶數據
    const existingUser = await prisma.user.findUnique({
      where: { id: userData.id },
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    // 更新用戶資料
    const updatedUser = await prisma.user.update({
      where: { id: userData.id },
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
