import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { thestatus } = await readBody(event);

    const count = await prismaClient.board.count({  // *post
        where: {
            verify: {
                in: thestatus && Array.isArray(thestatus) ? thestatus : ['ADOPTED'],
            },
        },
    });

    return count;
});