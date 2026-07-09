export const TASK_STATUS_VALUES = ["TODO", "IN_PROGRESS", "DONE"] as const;

export type TaskStatus = (typeof TASK_STATUS_VALUES)[number];

export const USER_ROLE_VALUES = ["USER", "ADMIN"] as const;

export type UserRole = (typeof USER_ROLE_VALUES)[number];
