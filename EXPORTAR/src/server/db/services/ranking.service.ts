import { RankingRepository } from "../repositories/ranking.repository";

export class RankingService {
  static async submitScore(input: { userId: number; score: number }) {
    const attempt = await RankingRepository.createAttempt(input.userId, input.score);
    const currentTop = await RankingRepository.getTop(5);

    const hasFreeSlot = currentTop.length < 5;
    const worst = currentTop.length > 0 ? currentTop[currentTop.length - 1].score : null;
    const shouldEnter = hasFreeSlot || (worst !== null && input.score > worst);

    if (!shouldEnter) {
      return { enteredTop: false, attemptId: attempt.id, top: currentTop };
    }

    await RankingRepository.recomputeTopFiveWithAttempt({
      userId: input.userId,
      scoreAttemptId: attempt.id,
      score: input.score,
    });

    return { enteredTop: true, attemptId: attempt.id, top: await RankingRepository.getTop(5) };
  }

  static async getTopFive() {
    return RankingRepository.getTop(5);
  }
}
