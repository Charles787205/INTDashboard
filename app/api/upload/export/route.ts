import { apiFetch } from "@/scripts/api";
import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const res = await apiFetch(
    process.env.INT_API_URL + "/laz_parcel_upload/export_file/",
    {
      method: "POST",

      body: formData,
    }
  );
  if (!res.ok) {
    return NextResponse.error();
  }
  const data = await res.json();
  console.log(data);
  return NextResponse.json("success");
}
