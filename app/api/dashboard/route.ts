import { apiFetch } from "@/scripts/api";

import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams.toString();
  const res = await apiFetch(
    process.env.INT_API_URL + `/dashboard?${searchParams}`
  );
  if (!res.ok) {
    return NextResponse.error();
  }
  const data = await res.json();
  return NextResponse.json(data);
}
