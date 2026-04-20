import { z } from "zod";

export const submitScoreSchema = z.object({
  userId: z.number().int().positive(),
  score: z.number().int().nonnegative(),
});

export type SubmitScoreInput = z.infer<typeof submitScoreSchema>;
