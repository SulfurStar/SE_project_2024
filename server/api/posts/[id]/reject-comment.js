import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  try {
    // 使用 Prisma 更新帖子狀態
    const updatedcomment = await prisma.comment.update({
      where: { id: Number(id) },
      data: { status: 'REMOVED' },
    });

    return {
      success: true,
      message: `comment with ID ${id} has been approved.`,
      comment: updatedcomment,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to approve comment with ID ${id}.`,
      error: error.message,
    };
  }
});