import { NextRequest, NextResponse } from "next/server";
import { apiFetch } from "@/scripts/api";
export async function GET(req: NextRequest) {
  const res = await apiFetch(process.env.INT_API_URL + "/user_request/");

  return NextResponse.json(await res.json());
}

export async function PATCH(req: NextRequest) {
  const { id, ...data } = await req.json();
  const res = await apiFetch(process.env.INT_API_URL + `/user_request/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  return NextResponse.json(await res.json());
}
