import { apiFetch } from "@/scripts/api";
import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const res = await apiFetch(
    process.env.INT_API_URL + "/areas/areaswithcoordinates"
  );
  if (!res.ok) {
    return NextResponse.error();
  }
  const areas = await res.json();

  return NextResponse.json(areas);
}
export async function POST(req: NextRequest) {
  const data = await req.json();

  const res = await apiFetch(process.env.INT_API_URL + "/areas/", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    return NextResponse.json(await res.json());
  } else {
    return NextResponse.error();
  }
}

export async function PATCH(req: NextRequest) {
  const area = await req.json();
  const res = await apiFetch(`${process.env.INT_API_URL}/areas/${area.id}/`, {
    method: "PATCH",
    body: JSON.stringify(area),
  });
  if (res.ok) {
    return NextResponse.json(await res.json());
  } else {
    return NextResponse.error();
  }
}

export async function DELETE(req: NextRequest) {
  const area = await req.json();
  console.log(area);
  const res = await apiFetch(`${process.env.INT_API_URL}/areas/${area.id}/`, {
    method: "DELETE",
    body: JSON.stringify(area),
  });
  if (res.ok) {
    return NextResponse.json("success");
  } else {
    return NextResponse.error();
  }
}
