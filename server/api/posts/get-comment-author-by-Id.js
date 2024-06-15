import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { authorId } = await readBody(event);

    const user = await prismaClient.user.findUnique({
        where: {
            id: parseInt(authorId, 10),
        },
    });
    return user;
});