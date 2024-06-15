import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  try {
    // 使用 Prisma 更新帖子狀態
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: { status: 'NORMAL' , reportedReason: null},
    });

    return {
      success: true,
      message: `Post with ID ${id} has been approved.`,
      post: updatedPost,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to approve post with ID ${id}.`,
      error: error.message,
    };
  }
});