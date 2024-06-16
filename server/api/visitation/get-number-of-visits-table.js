import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { userId } = await readBody(event);

    const count = await prismaClient.visit_table.count({
        where: {
            teacherId: userId
        },
    });

    return count;
});