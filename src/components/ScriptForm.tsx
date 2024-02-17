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
          <h1 className={"ml-[50%] text-2xl mb-10 mt-3"}>Script-R New Script</h1>
          <div className={"flex flex-row h-[80%]"}>
              <div className={"flex flex-col pb-[100%] ml-3"}>
                  <Input
                      className={
                          "w-[90%] bg-gray-900 hover:border-green-800 hover:bg-gray-800"
                      }
                      type="text"
                      onChange={(e) => {
                          script["Title"] = e.target.value;
                      }}
                      defaultValue={script["Title"] ? script["Title"] : "Title"}
                  />
                  <br/>
                  <Input
                      className={
                          "w-[90%] pb-64 bg-gray-900 hover:border-green-800 hover:bg-gray-800 placeholder:"
                      }
                      type="text"
                      onChange={(e) => {
                          script["Description"] = e.target.value;
                      }}
                      defaultValue={
                          script["Description"] ? script["Description"] : "Description"
                      }
                  />
                  <br/>
              </div>
              <Textarea
                  className={
                      "flex w-[85%] bg-gray-900 hover:border-green-800 hover:bg-gray-800"
                  }
                  onChange={(e) => {
                      script["Content"] = e.target.value;
                  }}
                  defaultValue={script["Content"] ? script["Content"] : "Content"}
              />
          </div>
          <button
              className={
                  "flex bg-gray-700 mt-9 justify-center items-center ml-[50%] pl-5 pr-5 pt-2 pb-2 rounded-3xl"
              }
              onClick={async (e) => {
                  e.preventDefault();

                  let user = await supabase.auth.getUser();

                  let {data: scriptData} = await supabase
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
  );
}
