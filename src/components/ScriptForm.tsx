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

export default function ScriptForm({ script }: { script: ScriptProps }) {
  const [newScriptTitle, setNewScriptTitle] = useState("");
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  return (
    <div>
      <h1
        className={
          "flex justify-center items-center text-2xl mb-10 mt-3 bg-gradient-to-r from-gray-900 border-s-2 ml-5 mr-5 pt-2 pb-2 rounded-xl border-b-2 " +
          "border-b-sky-200 "
        }
      >
        {newScriptTitle.length > 0 ? newScriptTitle : "New Script"}
      </h1>

      {/*History*/}

      <DropdownMenu>
        <DropdownMenuTrigger
          className={
            " border-2 border-red-500 px-3 py-2 rounded-md flex-auto items-end"
          }
        >
          History
        </DropdownMenuTrigger>

        <DropdownMenuContent className={"w-auto"}>
          <DropdownMenuLabel>Previous Changes</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div>
              <h1 className={"text-xl"}>Title</h1>
              <h3>Date:</h3>
              <h3>TIme:</h3>
              <p>
                This contains the description of the Previous version of the
                Script heloogtdbdxrgvtsdhdsgfcgvfd
              </p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className={"flex flex-row h-[80%] ml-1/8"}>
        <div className={"flex flex-col pb-[25%] ml-5"}>
          <Input
            className={
              "w-[90%] bg-gray-900 hover:border-safeclr hover:bg-gray-800 border-2 hover:duration-200"
            }
            placeholder={"Title"}
            type="text"
            onChange={(e) => {
              //script["Title"] = e.target.value;
              setNewScriptTitle(e.target.value);
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
              "flex bg-gray-700 mt-5 w-[90%] items-center justify-center rounded-3xl pt-2 pb-2 hover:duration-200 hover:border-sky-200 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]"
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
