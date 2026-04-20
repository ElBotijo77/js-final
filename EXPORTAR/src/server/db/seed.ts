import { eq } from "drizzle-orm";
import { db, pool } from "./client";
import { users } from "./schema/auth";
import { usersFixture, scoresFixture } from "./fixtures/load-fixtures";
import { RankingService } from "./services/ranking.service";
import { AuthService } from "./services/auth.service";

async function seed() {
  try {
    for (const row of usersFixture) {
      const [existing] = await db.select().from(users).where(eq(users.email, row.email)).limit(1);
      if (!existing) {
        await AuthService.register(row);
      }
    }

    for (const item of scoresFixture) {
      const [owner] = await db.select().from(users).where(eq(users.email, item.playerEmail)).limit(1);
      if (!owner) continue;
      await RankingService.submitScore({ userId: owner.id, score: item.score });
    }

    const top = await RankingService.getTopFive();
    console.log("Top 5 ready:", top);
  } finally {
    await pool.end();
  }
}

seed();
