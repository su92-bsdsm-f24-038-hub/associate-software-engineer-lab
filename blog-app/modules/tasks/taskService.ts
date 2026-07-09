import { CreateTaskInput, Task, TaskFilter, TaskStatus } from "./types";

const normalizeTitle = (title: string): string => title.trim().replace(/\s+/g, " ");

export function createTask(input: CreateTaskInput, idFactory: () => string = () => crypto.randomUUID()): Task {
  const title = normalizeTitle(input.title);

  if (!title) {
    throw new Error("Task title is required.");
  }

  return {
    id: idFactory(),
    title,
    status: "todo",
    createdAt: new Date().toISOString(),
  };
}

export function updateTaskStatus(tasks: Task[], taskId: string, status: TaskStatus): Task[] {
  return tasks.map((task) => (task.id === taskId ? { ...task, status } : task));
}

export function deleteTask(tasks: Task[], taskId: string): Task[] {
  return tasks.filter((task) => task.id !== taskId);
}

export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  if (filter === "all") {
    return tasks;
  }

  return tasks.filter((task) => task.status === filter);
}
