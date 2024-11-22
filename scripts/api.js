import { getServerSession } from "next-auth";
import { options as nextAuthOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export const apiFetch = async (url, options = {}) => {
  const session = await getServerSession(nextAuthOptions);

  if (session && session.user) {
    const defaultHeaders = {
      Authorization: `Bearer ${session.user.accessToken}`,
    };

    let fetchOptions;

    if (options.body instanceof FormData) {
      fetchOptions = {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers, // FormData headers are handled automatically
        },
      };
    } else {
      fetchOptions = {
        ...options,
        headers: {
          ...defaultHeaders,
          "Content-Type": "application/json",
          ...options.headers,
        },
      };
    }

    // Perform the fetch request and return the response
    return fetch(url, fetchOptions);
  } else {
    return fetch(url, options);
  }
};
