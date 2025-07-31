import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SignInResponse } from "@/types/api";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  if (
    username === process.env.AUTH_USERNAME &&
    password === process.env.AUTH_PASSWORD
  ) {
    const cookieStore = await cookies();
    cookieStore.set("user", JSON.stringify({ username, password }), {
      maxAge: 60 * 60 * 365 * 24,
    });
    return NextResponse.json({ success: true } as SignInResponse);
  }

  return NextResponse.json({
    success: false,
    errorMessage: "Invalid credentials",
  } as SignInResponse);
}
