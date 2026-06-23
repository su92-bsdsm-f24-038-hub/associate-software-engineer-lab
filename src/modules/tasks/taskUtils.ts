import { Task, TaskStatus, TaskError } from './types';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: TaskError;
}

// Pure Function: Task add karne ke liye
export const addTask = (tasks: Task[], newTask: Task): ApiResponse<Task[]> => {
  if (!newTask.title.trim()) {
    return {
      success: false,
      error: { type: 'VALIDATION_ERROR', message: 'Task ka title khali nahi ho sakta!' }
    };
  }
  return { success: true, data: [...tasks, newTask] };
};

// Generic Function: Kisi bhi property ke hisab se filter karne ke liye
export const filterByProperty = <T, K extends keyof T>(items: T[], key: K, value: T[K]): T[] => {
  return items.filter(item => item[key] === value);
};