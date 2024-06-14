// pages/api/updateEmail.js

import { PrismaClient } from '@prisma/client';
import { readBody, eventHandler } from 'h3';

const prisma = new PrismaClient();

export default eventHandler(async (event) => {
  if (event.req.method === 'POST') {
    try {
      const body = await readBody(event);
      const { userId, newEmail } = body;

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { email: newEmail },
      });

      return {
        status: 200,
        body: { message: 'Profile updated successfully', user: updatedUser }
      };
    } catch (error) {
      console.error('Error updating profile:', error);
      return {
        status: 500,
        body: { error: 'Error updating profile' }
      };
    }
  } else {
    return {
      status: 405,
      body: { error: 'Method not allowed' }
    };
  }
});
