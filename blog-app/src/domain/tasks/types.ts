export type TaskStatus = "todo" | "in-progress" | "done";

export type TaskFilter = TaskStatus | "all";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: string;
}

export interface CreateTaskInput {
  title: string;
}
