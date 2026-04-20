export type ApiError = {
  error: string;
};

export type SubmitScoreResponse = {
  enteredTop: boolean;
  attemptId: number;
  top: Array<{
    rankPosition: number;
    score: number;
    userId: number;
    username: string;
  }>;
};
