import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { skip, take, thestatus, ids } = await readBody(event);

    try {
        const whereClause = {
            status: {
                in: thestatus && Array.isArray(thestatus) ? thestatus : ['NORMAL'],
            },
        };

        if (ids) {
            whereClause.authorId = {
                equals: ids,
            };
        }

        const posts = await prismaClient.post.findMany({
            skip: skip || 0,
            take: take || 10,
            where: whereClause,
            orderBy: {
                createdAt: 'desc',
            },
        });

        return {
            statusCode: 200,
            body: posts,
        };
    } catch (error) {
        console.error('Error getting posts:', error);
        return {
            statusCode: 500,
            body: 'Internal Server Error',
        };
    }
});