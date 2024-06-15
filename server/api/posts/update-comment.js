import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { commentId,content } = await readBody(event);
    try {
        await prismaClient.comment.update({
            where: {
                id: parseInt(commentId, 10),
            },
            data: {
                content,
            }
        });
        return { success: true };
    } catch (error) {
        console.error('Error creating post:', error);
        return { success: false};
    }
});