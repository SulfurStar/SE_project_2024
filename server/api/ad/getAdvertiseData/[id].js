import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const adId = event.context.params.id;

  try {
    const advertise = await prisma.advertise.findUnique({
      where: { id: parseInt(adId, 10) },
    });

    if (!advertise) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Advertise not found',
      });
    }

    return advertise;
  } catch (error) {
    console.error('Error fetching advertise data:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching advertise data',
    });
  }
});
