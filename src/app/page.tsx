"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import Image from "next/image";

function Logging() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("code")) {
      router.refresh();
    }
  });

  const supabase = createClientComponentClient();

  return (
    <div className={"flex flex-col h-screen justify-center items-center"}>
      <div
        className={
          "mainbox flex flex-col items-center rounded-3xl opacity-100 bg-gray-900 p-10 w-auto h-auto justify-between border-2 " +
          "hover:duration-200 hover:border-sky-200 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] hover:scale-105 duration-200"
        }
      >
        <div className={"flex pb-28 pt-5 heading text-4xl "}>
          <span className={"text-3xl font-thin text-blue-300 "}>Script</span>

          <span className={"flex font-serif italic text-4xl text-blue-300 "}>
            R.
          </span>
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

export default function Login() {
  return (
    <Suspense>
      <Logging />
    </Suspense>
  );
}
