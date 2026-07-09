import { Task, TaskStatus } from "@/src/domain/tasks/types";

export interface TaskRepository {
  list(): Task[];
  save(task: Task): Task[];
  updateStatus(taskId: string, status: TaskStatus): Task[];
  remove(taskId: string): Task[];
}
