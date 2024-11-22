import { apiFetch } from "@/scripts/api";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const res = await apiFetch("/api/hubs");
  if (!res.ok) {
    return NextResponse.error();
  }
  const hubs = await res.json();

  return NextResponse.json(hubs);
}

export async function PATCH(req: NextRequest) {
  const hub = await req.json();
  apiFetch(
    JSON.stringify({
      latitude: hub.latitude,
      longitude: hub.longitude,
      zoom: hub.zoom,
    }),
    `/api/hubs/${hub.id}`
  );
}
