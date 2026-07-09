export { db } from "@/lib/db/client";

export {
  createUser,
  getUserByEmail,
  listUsersByRole,
  listUsers,
} from "@/lib/db/repositories/userRepository";

export {
  createTask,
  listTasks,
  setTaskStatus,
} from "@/lib/db/repositories/taskRepository";

export {
  createPost,
  getPostWithComments,
  listPosts,
} from "@/lib/db/repositories/postRepository";

export {
  createComment,
  listCommentsForPost,
} from "@/lib/db/repositories/commentRepository";
