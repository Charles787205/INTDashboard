import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {}

export async function GET(req: NextRequest) {
  return NextResponse.json({
    message: "Hello, World!",
  });
}
