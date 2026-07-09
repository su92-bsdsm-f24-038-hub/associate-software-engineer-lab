import { Prisma, User } from "@prisma/client";
import { db } from "@/lib/db/client";
import { UserRole } from "@/lib/db/types";

export type CreateUserInput = Prisma.UserCreateInput;

export async function createUser(data: CreateUserInput): Promise<User> {
  return db.user.create({ data });
}

export async function listUsers(): Promise<User[]> {
  return db.user.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return db.user.findUnique({ where: { email } });
}

export async function listUsersByRole(role: UserRole): Promise<User[]> {
  return db.user.findMany({
    where: { role },
    orderBy: { createdAt: "desc" },
  });
}
