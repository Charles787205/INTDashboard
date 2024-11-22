import { apiFetch } from "@/scripts/api";

import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");

  const res = await apiFetch(process.env.INT_API_URL + "/areas/upload/", {
    method: "POST",
    body: formData,
  });

  if (res.ok) {
    const response = await res.json();
    return NextResponse.json("success");
  } else {
    return NextResponse.json("error", { status: 400 });
  }
}
