import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async(event) => {
    const { postId, reason } = await readBody(event);
    
    const post = await prismaClient.post.findUnique({
        where: {
            id: parseInt(postId, 10)
        },
    });
    
    if (!post) {
        return { error: 'Post not found' };
    }
    
    await prismaClient.post.update({
        where: {
            id: parseInt(postId, 10)
        },
        data: {
            status: 'REPORTED',
            reportedReason: reason
        }
    });
    return { success: true };
});