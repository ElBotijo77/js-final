import { readFileSync } from "fs";
import { join } from "path";
import { parse } from "yaml";

type UserFixture = { username: string; email: string; password: string };
type ScoreFixture = { playerEmail: string; score: number };

function loadYaml<T>(filename: string): T {
  const filePath = join(__dirname, filename);
  const fileContent = readFileSync(filePath, "utf8");
  return parse(fileContent) as T;
}

export const usersFixture = loadYaml<{ users: UserFixture[] }>("users.yaml").users;
export const scoresFixture = loadYaml<{ scores: ScoreFixture[] }>("scores.yaml").scores;
