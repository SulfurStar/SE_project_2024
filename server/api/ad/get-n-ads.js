import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { skip, take, thestatus, ids } = await readBody(event);

    try {
        const whereClause = {
            verify: {
                in: thestatus && Array.isArray(thestatus) ? thestatus : ['ADOPTED'],
            },
        };

        if (ids) {
            whereClause.authorId = {
                equals: ids,
            };
        }

        const ads = await prismaClient.advertise.findMany({  //* post
            skip: skip || 0,
            take: take || 10,
            where: whereClause,
            orderBy: {
                createdAt: 'desc',
            },
        });

        return {
            statusCode: 200,  // success?
            body: ads,  //*
        };
    } catch (error) {
        console.error('Error getting ads:', error);
        return {
            statusCode: 500,
            body: 'Internal Server Error',
        };
    }
});