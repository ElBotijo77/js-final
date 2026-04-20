import { NextResponse } from "next/server";
import { submitScoreSchema } from "@/src/shared/schemas/ranking.schema";
import { RankingService } from "@/src/server/db/services/ranking.service";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const input = submitScoreSchema.parse(payload);
    const result = await RankingService.submitScore(input);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid score payload" }, { status: 400 });
  }
}
