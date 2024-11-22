import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { apiFetch } from "@/scripts/api";
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  const session = await getServerSession(options);
  const id = (await params).id;
  console.log(id);
  const res = await apiFetch(process.env.INT_API_URL + `/hubs/${id}`);
  if (res.ok) {
    const hubs = await res.json();

    return NextResponse.json(hubs);
  } else {
    return NextResponse.error();
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
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
