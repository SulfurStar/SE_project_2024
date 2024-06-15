import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { id, title, content, authorId, image } = await readBody(event);
    try {
        const updatedPost = await prismaClient.post.update({
            where: {
                id: parseInt(id, 10),
            },
            data: {
                title,
                content,
                authorId: parseInt(authorId, 10),
                imageUrl: image
            },
        });

        return {
            statusCode: 200,
            body: updatedPost,
        };
    } catch (error) {
        console.error('Error updating post:', error);
        return {
            statusCode: 500,
            body: 'Internal Server Error',
        };
    }
});