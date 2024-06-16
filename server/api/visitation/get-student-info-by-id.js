import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { studentId } = await readBody(event);

    try {
        const req = await prismaClient.user.findUnique({
            where: {
                id: studentId,
            }
        });

        return {
            success: true,
            body: req,
        };
    } catch (error) {
        console.error('Error getting posts:', error);
        return {
            success: false,
            body: 'Internal Server Error',
            statusCode: 500,
        };
    }
});