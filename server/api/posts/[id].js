// export default defineEventHandler(async (event) => {
//     const { id } = event.context.params
//     const query = `SELECT * FROM posts WHERE id = ?`
//     const results = await executeQuery(query, [id])
//     return results[0]
//   })
// import { PrismaClient } from '@prisma/client';

// const prismaClient = new PrismaClient();

export default defineEventHandler((event) => {
    const { id } = event.context.params;
    const dummyPost = {
        id: 1,
        title: "這邊宿舍真的超推!!!",
        content: "This is the content of the first post.",
        imageUrl: "https://via.placeholder.com/150",
        createdAt: "2024-06-01T00:00:00Z",
        author: { name: "小明" },
        status: "NORMAL"
      };
    return dummyPost;
});