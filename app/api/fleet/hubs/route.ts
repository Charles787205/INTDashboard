import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import { apiFetch } from "@/scripts/api";
export async function GET() {
  const session = await getServerSession(options);
  const res = await apiFetch(process.env.INT_API_URL + `/hubs/`);
  if (res.ok) {
    const hubs = await res.json();

    return NextResponse.json(hubs.results);
  } else {
    return NextResponse.error();
  }
}

export async function PATCH(req: NextRequest) {
  const data = await req.json();

  const session = await getServerSession(options);
  const res = await apiFetch(
    process.env.INT_API_URL + `/hubs/${session?.user.hub}/`,
    {
      method: "PATCH",
      body: JSON.stringify({
        latitude: data.latitude,
        longitude: data.longitude,
        zoom: data.zoom,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    return NextResponse.json(await res.json());
  } else {
    return NextResponse.error();
  }
}
