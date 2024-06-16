import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const adId = event.context.params.id;
  const updatedData = await readBody(event);

  // 移除不能更新的字段
  delete updatedData.id;
  delete updatedData.createdAt;
  delete updatedData.updatedAt;
  delete updatedData.authorId;

  // 確保phone字段是整數
  if (updatedData.phone) {
    updatedData.phone = parseInt(updatedData.phone, 10);
    if (isNaN(updatedData.phone)) {
      throw new Error('Invalid phone value');
    }
  }

  // 確保其他需要是整數的字段是整數
  if (updatedData.rent_low) {
    updatedData.rent_low = parseInt(updatedData.rent_low, 10);
    if (isNaN(updatedData.rent_low)) {
      throw new Error('Invalid rent_low value');
    }
  }

  if (updatedData.rent_high) {
    updatedData.rent_high = parseInt(updatedData.rent_high, 10);
    if (isNaN(updatedData.rent_high)) {
      throw new Error('Invalid rent_high value');
    }
  }

  try {
    const existingAd = await prisma.advertise.findUnique({
      where: { id: parseInt(adId, 10) },
    });

    if (!existingAd) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Advertise not found',
      });
    }

    const updatedAd = await prisma.advertise.update({
      where: { id: parseInt(adId, 10) },
      data: updatedData,
    });

    return {
      success: true,
      data: updatedAd,
    };
  } catch (error) {
    console.error('Error updating advertise:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update advertise',
    });
  }
});
