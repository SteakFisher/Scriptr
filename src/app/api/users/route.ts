import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../../../database.types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient(
    { cookies: () => cookies() },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_SERVICE_KEY,
      options: {
        db: {
          schema: "auth",
        },
      },
    },
  );

  const { data, error } = await supabase.from("identities").select("*");

  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }

  return new Response("Hello, world!");
}
