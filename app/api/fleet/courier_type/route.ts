import { NextResponse, NextRequest } from "next/server";
import { apiFetch } from "@/scripts/api";
export async function GET() {
  const res = await apiFetch(
    process.env.INT_API_URL + "/fleet/get_courier_type"
  );

  if (res.ok) {
    return NextResponse.json(await res.json());
  } else {
    return NextResponse.error();
  }
}
