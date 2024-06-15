import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { postId,content,authorId } = await readBody(event);
    try {
        const comment = await prismaClient.comment.create({
            data: {
                content,
                authorId: parseInt(authorId, 10),
                postId: parseInt(postId, 10)
            }
        });
        return { success: true };
    } catch (error) {
        console.error('Error creating post:', error);
        return { success: false};
    }
});