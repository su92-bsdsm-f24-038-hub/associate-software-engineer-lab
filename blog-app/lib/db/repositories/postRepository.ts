import { Post, Prisma } from "@prisma/client";
import { db } from "@/lib/db/client";

export type CreatePostInput = Prisma.PostCreateInput;

export async function createPost(data: CreatePostInput): Promise<Post> {
  return db.post.create({ data });
}

export async function listPosts(includeDrafts = true): Promise<Post[]> {
  return db.post.findMany({
    where: includeDrafts ? undefined : { published: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPostWithComments(postId: number): Promise<Prisma.PostGetPayload<{ include: { comments: true; author: true } }> | null> {
  return db.post.findUnique({
    where: { id: postId },
    include: {
      comments: true,
      author: true,
    },
  });
}
