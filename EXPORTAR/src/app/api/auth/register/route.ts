import { NextResponse } from "next/server";
import { registerSchema } from "@/src/shared/schemas/auth.schema";
import { AuthService } from "@/src/server/db/services/auth.service";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const input = registerSchema.parse(payload);
    const created = await AuthService.register(input);
    return NextResponse.json({ id: created.id, email: created.email }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request or register failed" }, { status: 400 });
  }
}
