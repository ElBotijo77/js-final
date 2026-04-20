import { eq } from "drizzle-orm";
import { db } from "../client";
import { users } from "../schema/auth";

export class AuthRepository {
  static async findByEmail(email: string) {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return user ?? null;
  }

  static async createUser(data: { username: string; email: string; passwordHash: string }) {
    const [created] = await db.insert(users).values(data).returning();
    return created;
  }
}
