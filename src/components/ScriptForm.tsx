"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScriptProps } from "@/types/ScriptTypes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Database } from "../../database.types";
import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Edit = {
  Content: string;
  Updated_at: string;
  id: string;
};

export default function ScriptForm({
  script,
  save = false,
  edits,
}: {
  script: ScriptProps;
  save: boolean;
  edits?: Edit[];
}) {
  const [newScriptTitle, setNewScriptTitle] = useState(script["Title"]);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  console.log("yea", edits);

  return (
    <div>
      <h1
        className={
          "flex justify-center items-center text-2xl mb-3 mt-3 bg-gradient-to-r from-gray-900 border-s-2 ml-5 mr-5 pt-2 pb-2 rounded-xl border-b-2 " +
          "border-b-sky-200 "
        }
      >
        {newScriptTitle ? newScriptTitle : "New Script"}
      </h1>

      {edits ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            className={
              " border-2 border-cyan-800 px-2 py-2 text-gray-400 rounded-md ml-[90%] m-5 pt-1 pb-1 justify-center hover:border-cyan-500 hover:duration-200 hover:text-white"
            }
          >
            History
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className={"w-96 mr-6 mt-4 border-2 border-cyan-500"}
          >
            <DropdownMenuLabel>Previous Changes</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {edits.map((edit) => {
              return (
                <DropdownMenuItem key={edit.Updated_at}>
                  <Link href={`/scripts/history/${edit.id}`}>
                    <div className={"border-2 border-gray-800 p-4"}>
                      <h3 className={"text-blue-300"}>
                        Date: {edit.Updated_at.split("T")[0]}
                      </h3>
                      <p className={"text-white"}>{edit["Content"]}</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
      <div className={"flex flex-row h-[80%] ml-1/8"}>
        <div className={"flex flex-col pb-[25%] ml-5"}>
          <Input
            className={
              "w-[90%] bg-gray-900 hover:border-safeclr hover:bg-gray-800 border-2 hover:duration-200"
            }
            // placeholder={"Title"}
            type="text"
            onChange={(e) => {
              script["Title"] = e.target.value;
              setNewScriptTitle(newScriptTitle);
            }}
            placeholder={script["Title"] ? undefined : "Title"}
            value={script["Title"] ? script["Title"] : undefined}
          />

          <br />
          <Textarea
            className={
              "w-[90%] pb-64 bg-gray-900 hover:border-safeclr hover:bg-gray-800 pt-4 pl-04 border-2 hover:duration-200"
            }
            onChange={(e) => {
              script["Description"] = e.target.value;
            }}
            placeholder={script["Description"] ? undefined : "Description"}
            value={script["Description"] ? script["Description"] : undefined}
          />
          <br />
          {save ? (
            <button
              disabled={isLoading}
              className={
                "flex bg-gray-700 mt-5 w-[90%] items-center justify-center rounded-3xl pt-2 pb-2 hover:duration-200 hover:border-sky-200 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"
              }
              onClick={async (e) => {
                e.preventDefault();
                setIsLoading(true);
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

                setIsLoading(false);

                router.push(`/scripts/${scriptData[0].id}`);
              }}
              type="submit"
            >
              Save
            </button>
          ) : null}
          <button
            className={
              "flex bg-gray-700 mt-5 w-[90%] items-center justify-center rounded-3xl pt-2 pb-2 hover:duration-200 hover:border-red-500 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#ED8D28,0_0_15px_#ED8D28,0_0_30px_#ED8D28]"
            }
          >
            <Link href={"/dashboard"}>Dashboard</Link>
          </button>
        </div>
        <Textarea
          className={
            "flex w-[79%] bg-gray-900 hover:border-safeclr hover:bg-gray-800 ml-10 border-2 hover:duration-200"
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
