import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const scoreAttempts = pgTable("score_attempts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  score: integer("score").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const globalRanking = pgTable("global_ranking", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  scoreAttemptId: integer("score_attempt_id")
    .notNull()
    .references(() => scoreAttempts.id, { onDelete: "cascade" }),
  score: integer("score").notNull(),
  rankPosition: integer("rank_position").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
