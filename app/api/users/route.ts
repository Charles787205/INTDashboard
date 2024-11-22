import { NextRequest, NextResponse } from "next/server";
import { apiFetch } from "@/scripts/api";
export async function GET(req: NextRequest) {
  const res = await apiFetch(process.env.INT_API_URL + "/users/");

  return NextResponse.json(await res.json());
}
