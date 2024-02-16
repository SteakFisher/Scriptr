"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();

  if (searchParams.get("code")) {
    router.refresh();
  }

  const supabase = createClientComponentClient();

  return (
    <div>
      <h1>Login</h1>
      <button
        onClick={async (e) => {
          const { data } = await supabase.auth.signInWithOAuth({
            provider: "google",
          });
        }}
      >
        {" "}
        Login button{" "}
      </button>
    </div>
  );
}
