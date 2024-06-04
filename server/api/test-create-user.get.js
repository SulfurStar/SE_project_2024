import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

export default defineEventHandler(() => {
  const user = prismaClient.user.create({
    data: {
      createdAt: new Date("2024-05-14T09:04:17.919Z"),
      email: 'ryanchien8125@gmail.com',
      name: 'Ryan Chien',
      role: 'ADMIN',
    }
  })

  return user
})