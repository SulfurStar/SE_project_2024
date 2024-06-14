import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { thestatus } = await readBody(event);

    const count = await prismaClient.post.count({
        where: {
            status: {
                in: thestatus && Array.isArray(thestatus) ? thestatus : ['NORMAL'],
            },
        },
    });

    return count;
});