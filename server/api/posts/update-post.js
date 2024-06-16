import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { id, title, content, authorId, images } = await readBody(event);
    console.log('id:', id);
    console.log('title:', title);
    console.log('content:', content);
    console.log('authorId:', authorId);
    console.log('images:', images);
    try {
        const updatedPost = await prismaClient.post.update({
            where: {
                id: parseInt(id, 10),
            },
            data: {
                title,
                content,
                authorId: parseInt(authorId, 10),
                imageUrl: images
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