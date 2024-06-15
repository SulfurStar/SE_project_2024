// server/api/users.js
// 用來顯示所有帳號
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default eventHandler(async (event) => {
  const { adminId } = await readBody(event);
  const users = await prisma.user.findMany({
    where: {
      id: {
        not : parseInt(adminId, 10)
      }
    },
  });


  return users;
});
