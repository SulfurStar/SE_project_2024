import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const adId = event.context.params.id;
  const { verify } = await readBody(event);

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
      data: { verify },
    });

    return {
      success: true,
      data: updatedAd,
    };
  } catch (error) {
    console.error('Error approving advertise:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to approve advertise',
    });
  }
});
