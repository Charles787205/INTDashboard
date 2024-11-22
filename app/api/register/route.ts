import { apiFetch } from "@/scripts/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const userRequest = await req.json();
  const data = {
    first_name: userRequest.firstName,
    middle_name: userRequest.middleName,
    last_name: userRequest.lastName,
    username: userRequest.username,
    is_active: userRequest.isActive,
    email: userRequest.email,
    hub: userRequest.hub,
    password: userRequest.password,
    position: userRequest.position,
  };
  const res = await fetch(process.env.INT_API_URL + "/user_request/", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("sadfasfasfsadfasdf");
  if (res.ok) {
    return NextResponse.json(await res.json());
  } else {
    return NextResponse.error();
  }
}
