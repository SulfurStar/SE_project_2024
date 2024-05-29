import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';

const prismaClient = new PrismaClient()

export default defineEventHandler(async () => {
    const imageId = 1; // 假設圖片ID為1
    const image = await prismaClient.testPhoto.findUnique({
        where: { id: imageId }
    });

    if (image) {
        // 保存圖片到文件
        const outputPath = './retrieved_image.jpg';
        await writeFile(outputPath, image.image);
        console.log('Image saved to:', outputPath);
    } else {
        console.log('Image not found');
    }
})