import { TaskRepository } from "@/src/application/tasks/ports/TaskRepository";
import { updateTaskStatusRule } from "@/src/domain/tasks/taskRules";
import { Task, TaskStatus } from "@/src/domain/tasks/types";

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];

  list(): Task[] {
    return [...this.tasks];
  }

  save(task: Task): Task[] {
    this.tasks = [task, ...this.tasks];
    return this.list();
  }

  updateStatus(taskId: string, status: TaskStatus): Task[] {
    this.tasks = this.tasks.map((task) =>
      task.id === taskId ? updateTaskStatusRule(task, status) : task
    );

    return this.list();
  }

  remove(taskId: string): Task[] {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    return this.list();
  }
}
