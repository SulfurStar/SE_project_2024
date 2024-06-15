import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { commentId } = await readBody(event);

    const comment = await prismaClient.comment.findUnique({
        where: {
            id: parseInt(commentId, 10),
        },
    });

    return comment;
});