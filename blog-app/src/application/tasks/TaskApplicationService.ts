import { TaskRepository } from "@/src/application/tasks/ports/TaskRepository";
import { createTaskEntity, filterTasksRule } from "@/src/domain/tasks/taskRules";
import { CreateTaskInput, Task, TaskFilter, TaskStatus } from "@/src/domain/tasks/types";

export class TaskApplicationService {
  constructor(private readonly taskRepository: TaskRepository) {}

  list(): Task[] {
    return this.taskRepository.list();
  }

  create(input: CreateTaskInput): Task[] {
    const task = createTaskEntity(input);
    return this.taskRepository.save(task);
  }

  updateStatus(taskId: string, status: TaskStatus): Task[] {
    return this.taskRepository.updateStatus(taskId, status);
  }

  remove(taskId: string): Task[] {
    return this.taskRepository.remove(taskId);
  }

  filter(tasks: Task[], filter: TaskFilter): Task[] {
    return filterTasksRule(tasks, filter);
  }
}
