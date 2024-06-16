import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { studentId,visitAddress } = await readBody(event);
    // find teacherId by studentId
    const student = await prismaClient.user.findUnique({
        where: {
            id: parseInt(studentId, 10)
        }
    });
    if (!student) {
        return { success: false, error: 'Student not found' };
    }
    if (!student.teacher) {
        return { success: false, error: 'Teacher not found' };
    }

    // check if student already has a visitation request
    const existingVisit = await prismaClient.visit_table.findFirst({
        where: {
            studentId: parseInt(studentId, 10),
        }
    });

    // if student already has a visitation request modify the existing one
    if (existingVisit) {
        try {
            const vr = await prismaClient.visit_table.update({
                where: {
                    id: existingVisit.id
                },
                data: {
                    visit_address: visitAddress,
                }
            });
            return { success: true };
        } catch (error) {
            console.error('Error updating post:', error);
            return { success: false, error: 'Error updating post'};
        }
    }else{
        // create a new visitation request
        try {
            const vr = await prismaClient.visit_table.create({
                data: {
                    studentId: parseInt(studentId, 10),
                    teacherId: parseInt(student.teacher),
                    visit_address: visitAddress,
                }
            });
            return { success: true };
        } catch (error) {
            console.error('Error creating post:', error);
            return { success: false, error: 'Error creating post'};
        }
    }
});