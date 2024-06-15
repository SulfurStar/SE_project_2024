import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async(event) => {
  const { BdId } = await readBody(event);
  
  const bd = await prismaClient.board.findUnique({
    where: {
      id: parseInt(BdId, 10)
    },
  });

  if (!bd) {
    return { error: 'Bd not found' };
  }

  return bd;
});