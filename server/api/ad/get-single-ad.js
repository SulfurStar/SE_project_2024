import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async(event) => {
  const { AdId } = await readBody(event);
  
  const ad = await prismaClient.advertise.findUnique({
    where: {
      id: parseInt(AdId, 10)
    },
  });

  if (!ad) {
    return { error: 'Ad not found' };
  }

  return ad;
});