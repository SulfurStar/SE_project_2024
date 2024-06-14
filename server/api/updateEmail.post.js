// api/updateEmail.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { userId, newEmail } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { email: newEmail },
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error updating email' });
  } finally {
    await prisma.$disconnect();
  }
}
