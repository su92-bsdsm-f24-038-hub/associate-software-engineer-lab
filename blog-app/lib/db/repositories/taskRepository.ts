import { Prisma, Task } from "@prisma/client";
import { db } from "@/lib/db/client";
import { TaskStatus } from "@/lib/db/types";

export type CreateTaskInput = Prisma.TaskCreateInput;

export async function createTask(data: CreateTaskInput): Promise<Task> {
  return db.task.create({ data });
}

export async function listTasks(status?: TaskStatus): Promise<Task[]> {
  return db.task.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export async function setTaskStatus(taskId: number, status: TaskStatus): Promise<Task> {
  return db.task.update({
    where: { id: taskId },
    data: {
      status,
      completed: status === "DONE",
    },
  });
}
