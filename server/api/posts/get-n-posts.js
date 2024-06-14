import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { skip, take , thestatus } = await readBody(event);

    const posts = await prismaClient.post.findMany({
        skip: skip || 0,
        take: take || 10,
        where: {
            status: {
                in: thestatus && Array.isArray(thestatus) ? thestatus : ['NORMAL'],
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return posts;
});