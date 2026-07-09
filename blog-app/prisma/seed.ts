import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.comment.deleteMany();
  await prisma.task.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const ali = await prisma.user.create({
    data: { email: "ali@example.com", name: "Ali Khan", role: "USER" },
  });

  const sara = await prisma.user.create({
    data: { email: "sara@example.com", name: "Sara Noor", role: "USER" },
  });

  const hamza = await prisma.user.create({
    data: { email: "hamza@example.com", name: "Hamza Akmal", role: "ADMIN" },
  });

  await prisma.task.createMany({
    data: [
      {
        title: "Prepare sprint board",
        description: "Create and prioritize this week tasks",
        status: "IN_PROGRESS",
        assigneeId: ali.id,
      },
      {
        title: "Review PRs",
        description: "Review integration and database PRs",
        status: "TODO",
        assigneeId: sara.id,
      },
      {
        title: "Publish deployment checklist",
        description: "Finalize release checks for QA",
        status: "DONE",
        completed: true,
        assigneeId: hamza.id,
      },
    ],
  });

  const postOne = await prisma.post.create({
    data: {
      title: "Day 8 Prisma Basics",
      content: "We introduced Prisma schema, seed data, and typed repositories.",
      published: true,
      authorId: ali.id,
    },
  });

  const postTwo = await prisma.post.create({
    data: {
      title: "Workboard Retrospective",
      content: "Workboard integration improved team visibility and workflow.",
      published: false,
      authorId: sara.id,
    },
  });

  await prisma.comment.createMany({
    data: [
      {
        content: "Great start on database layering.",
        postId: postOne.id,
        authorId: hamza.id,
      },
      {
        content: "Please add pagination in next iteration.",
        postId: postOne.id,
        authorId: sara.id,
      },
      {
        content: "Looks good for initial release.",
        postId: postTwo.id,
        authorId: ali.id,
      },
    ],
  });

  console.info("Seed completed: users, tasks, posts, comments inserted.");
}

main()
  .catch((error) => {
    console.error("Seed failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
