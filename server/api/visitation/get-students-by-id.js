import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { userId} = await readBody(event);

    try {
        const req = await prismaClient.visit_table.findMany({
            where: {
                teacherId: userId
            }
        });

        return {
            statusCode: 200,
            body: req,
        };
    } catch (error) {
        console.error('Error getting posts:', error);
        return {
            statusCode: 500,
            body: 'Internal Server Error',
        };
    }
});