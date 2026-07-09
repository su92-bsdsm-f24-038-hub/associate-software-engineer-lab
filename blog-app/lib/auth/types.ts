import { UserRole } from "@/lib/db/types";

export interface AuthSession {
  userId: number;
  email: string;
  name: string;
  role: UserRole;
}
