import { NextResponse } from "next/server";
import { loginSchema } from "@/src/shared/schemas/auth.schema";
import { AuthService } from "@/src/server/db/services/auth.service";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const input = loginSchema.parse(payload);
    const user = await AuthService.login(input);

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ id: user.id, email: user.email, username: user.username }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
