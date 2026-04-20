import { NextResponse } from "next/server";
import { RankingService } from "@/src/server/db/services/ranking.service";

export async function GET() {
  const top = await RankingService.getTopFive();
  return NextResponse.json({ top }, { status: 200 });
}
