import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { postId } = await readBody(event);

    const posts = await prismaClient.comment.findMany({
        where: {
            postId: parseInt(postId, 10),
        },
    });

    return posts;
});