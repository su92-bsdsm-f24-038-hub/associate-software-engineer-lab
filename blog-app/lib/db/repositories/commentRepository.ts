import { Comment, Prisma } from "@prisma/client";
import { db } from "@/lib/db/client";

export type CreateCommentInput = Prisma.CommentCreateInput;

export async function createComment(data: CreateCommentInput): Promise<Comment> {
  return db.comment.create({ data });
}

export async function listCommentsForPost(postId: number): Promise<Comment[]> {
  return db.comment.findMany({
    where: { postId },
    orderBy: { createdAt: "asc" },
  });
}
