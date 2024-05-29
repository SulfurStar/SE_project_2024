import { PrismaClient } from '@prisma/client'
import { readFile } from 'fs/promises';

const prismaClient = new PrismaClient()

export default defineEventHandler(async () => {
    const imagePath = './test.png';
    const image = await readFile(imagePath);

    const new_image = await prismaClient.testPhoto.create({
        data: {
            image: image,
            description: 'A description of the image'
        }
    })

    return new_image
})