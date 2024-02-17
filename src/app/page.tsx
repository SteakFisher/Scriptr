"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();

  if (searchParams.get("code")) {
    router.refresh();
  }

  const supabase = createClientComponentClient();

  return (
    <div className={"flex flex-col h-screen justify-center items-center"}>
      <div
        className={
          "mainbox flex flex-col items-center rounded-3xl opacity-60 hover:opacity-100 hover:bg-safeclr p-10 w-auto h-auto justify-between border-4 " +
          "hover:border-l-emerald-700 hover:border-r-emerald-700 duration-200  "
        }
      >
        <div
          className={
            "pb-28 pt-5 heading text-4xl fon font-family['Julius Sans One'] flex"
          }
        >
          Scriptr
        </div>
        <button
          className={"pb-5 text-5xl hover:scale-105 duration-200"}
          onClick={async (e) => {
            const { data } = await supabase.auth.signInWithOAuth({
              provider: "google",
            });
          }}
        >
          <Image
            src={"/googleSignIn.svg"}
            alt={"yea"}
            width={200}
            height={400}
          />
        </button>
      </div>
    </div>
  );
}
