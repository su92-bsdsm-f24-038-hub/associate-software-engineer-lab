import { describe, expect, it } from "vitest";
import { createTask, filterTasks, updateTaskStatus } from "@/modules/tasks/taskService";
import { Task } from "@/modules/tasks/types";

describe("taskService", () => {
  it("creates task with normalized title", () => {
    const task = createTask({ title: "  Plan   demo  " }, () => "task-1");

    expect(task.id).toBe("task-1");
    expect(task.title).toBe("Plan demo");
    expect(task.status).toBe("todo");
  });

  it("updates status and filters tasks", () => {
    const base: Task[] = [
      { id: "1", title: "A", status: "todo", createdAt: "2026-07-09T10:00:00.000Z" },
      { id: "2", title: "B", status: "done", createdAt: "2026-07-09T10:00:00.000Z" },
    ];

    const updated = updateTaskStatus(base, "1", "in-progress");
    const filtered = filterTasks(updated, "in-progress");

    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe("1");
  });
});
