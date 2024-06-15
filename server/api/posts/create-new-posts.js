import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { title, content, authorId, image } = await readBody(event);
    try {
        const post = await prismaClient.post.create({
            data: {
                title,
                content,
                authorId: parseInt(authorId, 10),
                imageUrl: image
            }
        });
        return {
            statusCode: 200,
            body: post
        };
    } catch (error) {
        console.error('Error creating post:', error);
        // 根據需要返回適當的錯誤響應
        return {
            statusCode: 500,
            body: 'Internal Server Error'
        };
    }
});