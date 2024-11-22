import { apiFetch } from "@/scripts/api";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const res = await apiFetch(process.env.INT_API_URL + "/runsheet/");
  return NextResponse.json(await res.json());
}
