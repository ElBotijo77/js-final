import { asc, desc, eq, sql } from "drizzle-orm";
import { db } from "../client";
import { users } from "../schema/auth";
import { globalRanking, scoreAttempts } from "../schema/ranking";

export class RankingRepository {
  static async createAttempt(userId: number, score: number) {
    const [attempt] = await db.insert(scoreAttempts).values({ userId, score }).returning();
    return attempt;
  }

  static async getTop(limit = 5) {
    return db
      .select({
        rankPosition: globalRanking.rankPosition,
        score: globalRanking.score,
        userId: users.id,
        username: users.username,
      })
      .from(globalRanking)
      .innerJoin(users, eq(globalRanking.userId, users.id))
      .orderBy(asc(globalRanking.rankPosition))
      .limit(limit);
  }

  static async recomputeTopFiveWithAttempt(newAttempt: { userId: number; scoreAttemptId: number; score: number }) {
    await db.transaction(async (tx) => {
      const current = await tx
        .select({
          userId: globalRanking.userId,
          scoreAttemptId: globalRanking.scoreAttemptId,
          score: globalRanking.score,
        })
        .from(globalRanking)
        .orderBy(desc(globalRanking.score), asc(globalRanking.id));

      const merged = [...current, newAttempt].sort((a, b) => b.score - a.score).slice(0, 5);

      await tx.delete(globalRanking).where(sql`1 = 1`);
      if (merged.length === 0) return;

      await tx.insert(globalRanking).values(
        merged.map((entry, index) => ({
          userId: entry.userId,
          scoreAttemptId: entry.scoreAttemptId,
          score: entry.score,
          rankPosition: index + 1,
        }))
      );
    });
  }
}
