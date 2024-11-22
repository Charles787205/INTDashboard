import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import { apiFetch } from "@/scripts/api";

export async function POST(request: NextRequest) {
  const courier = await request.json();

  const response = await apiFetch(process.env.INT_API_URL + "/couriers/", {
    method: "POST",
    body: JSON.stringify(courier),
  });

  if (response.ok) {
    return NextResponse.json(await response.json());
  } else {
    return NextResponse.error();
  }
}

export async function GET(request: NextRequest) {
  const response = await apiFetch(process.env.INT_API_URL + "/couriers/");

  if (response.ok) {
    return NextResponse.json(await response.json());
  } else {
    return NextResponse.error();
  }
}
