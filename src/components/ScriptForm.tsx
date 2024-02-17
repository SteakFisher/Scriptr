"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../database.types";
import { ScriptProps } from "@/types/ScriptTypes";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Label } from "@/components/ui/label";

export default function ScriptForm({ script }: { script: ScriptProps }) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  return (
    <div>
      <h1
        className={
          "flex justify-center items-center text-2xl mb-10 mt-3 bg-gray-900 ml-5 mr-5 pt-2 pb-2 rounded-xl border-2"
        }
      >
        New Script
      </h1>
      <div className={"flex flex-row h-[80%] ml-1/8"}>
        <div className={"flex flex-col pb-[25%] ml-3"}>
          <Input
            className={
              "w-[90%] bg-gray-900 hover:border-safeclr hover:bg-gray-800 border-2 hover:duration-200"
            }
            placeholder={"Title"}
            type="text"
            onChange={(e) => {
              script["Title"] = e.target.value;
            }}
            defaultValue={script["Title"] ? script["Title"] : undefined}
          />
          <br />
          <Textarea
            className={
              "w-[90%] pb-64 bg-gray-900 hover:border-safeclr hover:bg-gray-800 pt-4 pl-04 border-2 hover:duration-200"
            }
            placeholder={"Description"}
            onChange={(e) => {
              script["Description"] = e.target.value;
            }}
            defaultValue={
              script["Description"] ? script["Description"] : undefined
            }
          />
          <br />
          <button
            className={
              "flex bg-gray-700 mt-9 w-[90%] items-center justify-center rounded-3xl pt-2 pb-2 hover:duration-200 hover:border-sky-200 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"
            }
            onClick={async (e) => {
              e.preventDefault();

              let user = await supabase.auth.getUser();

              let { data: scriptData } = await supabase
                .from("Scripts")
                .upsert({
                  id: script["id"],
                  Title: script["Title"],
                  Description: script["Description"],
                  EmailID: user.data.user?.email,
                })
                .select("id");

              if (!scriptData) {
                console.log("Error creating script");
                return;
              }

              await supabase.from("Edits").insert({
                Content: script["Content"],
                // @ts-ignore
                ScriptId: scriptData[0].id,
              });

              router.push(`/scripts/${scriptData[0].id}`);
            }}
            type="submit"
          >
            Save
          </button>
        </div>
        <Textarea
          className={
            "flex w-[80%] bg-gray-900 hover:border-safeclr hover:bg-gray-800 ml-10 border-2 hover:duration-200"
          }
          placeholder={"Content"}
          onChange={(e) => {
            script["Content"] = e.target.value;
          }}
          defaultValue={script["Content"] ? script["Content"] : undefined}
        />
      </div>
    </div>
  );
}
