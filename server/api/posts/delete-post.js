import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async(event) => {
    const { postId } = await readBody(event);
    
    const post = await prismaClient.post.findUnique({
        where: {
            id: parseInt(postId, 10)
        },
    });
    
    if (!post) {
        return { error: 'Post not found' };
    }
    
    await prismaClient.post.delete({
        where: {
        id: parseInt(postId, 10)
        },
    });
    
    return { success: true };
});