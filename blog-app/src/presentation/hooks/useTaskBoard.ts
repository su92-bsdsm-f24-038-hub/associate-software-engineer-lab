"use client";

import { useMemo, useRef, useState } from "react";
import { TaskApplicationService } from "@/src/application/tasks/TaskApplicationService";
import { InMemoryTaskRepository } from "@/src/infrastructure/tasks/InMemoryTaskRepository";
import { TaskFilter } from "@/src/domain/tasks/types";

export function useTaskBoard() {
  const serviceRef = useRef<TaskApplicationService>(
    new TaskApplicationService(new InMemoryTaskRepository())
  );
  const service = serviceRef.current;

  const [taskInput, setTaskInput] = useState("");
  const [taskFilter, setTaskFilter] = useState<TaskFilter>("all");
  const [tasks, setTasks] = useState(service.list());

  const filteredTasks = useMemo(() => service.filter(tasks, taskFilter), [service, tasks, taskFilter]);

  const addTask = () => {
    try {
      const nextTasks = service.create({ title: taskInput });
      setTasks(nextTasks);
      setTaskInput("");
    } catch {
      // Validation errors are intentionally handled at service layer.
    }
  };

  const markInProgress = (taskId: string) => {
    setTasks(service.updateStatus(taskId, "in-progress"));
  };

  const markDone = (taskId: string) => {
    setTasks(service.updateStatus(taskId, "done"));
  };

  const removeTask = (taskId: string) => {
    setTasks(service.remove(taskId));
  };

  return {
    taskInput,
    taskFilter,
    tasks,
    filteredTasks,
    setTaskInput,
    setTaskFilter,
    addTask,
    markInProgress,
    markDone,
    removeTask,
  };
}
