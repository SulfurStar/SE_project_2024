import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { studentId } = await readBody(event);

    try {
        const req = await prismaClient.visit_record.findFirst({
            where: {
                studentId,
            }
        });
        if(req){
            return {
                success: true,
                body: req,
            };
        }else{
            return {
                success: false,
                body: 'No student found',
            };
        }
    } catch (error) {
        console.error('Error getting posts:', error);
        return {
            success: false,
            body: 'Internal Server Error',
        };
    }
});