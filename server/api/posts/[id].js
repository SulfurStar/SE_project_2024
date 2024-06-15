import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async(event) => {
  const { postId } = await readBody(event);
  
  const post = await prismaClient.post.findUnique({
    where: {
      id: parseInt(postId, 10)
    },
  });

  if (!post) {
    return { error: 'Post not found' };
  }

  const author = await prismaClient.user.findUnique({
    where: {
      id: post.authorId
    },
  });

  if (!author) {
    return { post, error: 'Author not found' };
  }

  return { post, authorName: author.name , authorId: post.authorId};
});