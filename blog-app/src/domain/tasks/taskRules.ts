import { CreateTaskInput, Task, TaskFilter, TaskStatus } from "@/src/domain/tasks/types";

const normalizeTitle = (title: string): string => title.trim().replace(/\s+/g, " ");

export function createTaskEntity(
  input: CreateTaskInput,
  idFactory: () => string = () => crypto.randomUUID(),
  dateFactory: () => string = () => new Date().toISOString()
): Task {
  const title = normalizeTitle(input.title);

  if (!title) {
    throw new Error("Task title is required.");
  }

  return {
    id: idFactory(),
    title,
    status: "todo",
    createdAt: dateFactory(),
  };
}

export function updateTaskStatusRule(task: Task, status: TaskStatus): Task {
  return { ...task, status };
}

export function filterTasksRule(tasks: Task[], filter: TaskFilter): Task[] {
  if (filter === "all") {
    return tasks;
  }

  return tasks.filter((task) => task.status === filter);
}
