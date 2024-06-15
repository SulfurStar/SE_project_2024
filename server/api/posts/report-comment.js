import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async(event) => {
    const { commentId, reason } = await readBody(event);
    
    const comment = await prismaClient.comment.findUnique({
        where: {
            id: parseInt(commentId, 10)
        },
    });
    
    if (!comment) {
        return { error: 'comment not found' };
    }
    
    await prismaClient.comment.update({
        where: {
            id: parseInt(commentId, 10)
        },
        data: {
            status: 'REPORTED',
            reportedReason: reason
        }
    });
    return { success: true };
});