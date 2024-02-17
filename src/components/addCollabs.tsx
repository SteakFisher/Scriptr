"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../database.types";
import { createSupabaseClient } from "@supabase/auth-helpers-shared";

export default function AddCollabs({
  emailList,
  scriptId,
}: {
  emailList: { [key: string]: string };
  scriptId: string;
}) {
  let input = "";
  const supabase = createClientComponentClient<Database>();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={"absolute mt-20 ml-5"}>
          Add Collaborators
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] hover:duration-200 hover:border-sky-200 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
        <DialogHeader>
          <DialogTitle
            className={"text-blue-300 underline decoration-blue-300"}
          >
            Edit profile
          </DialogTitle>
          <DialogDescription>
            {"Add collaborator emails [seperated by commas]"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right text-blue-300">
              Email
            </Label>
            <Input
              id="name"
              placeholder={"literallytrolling@gmail.com"}
              className="col-span-3"
              onChange={(e) => {
                input = e.target.value;
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className={"bg-blue-300 font-bold"}
            type="submit"
            onClick={async () => {
              let emails = input.split(",");
              let newEmails: object[] = [];
              emails.map((email) => {
                let newemail = email.toLowerCase();
                newemail = email.trimStart();
                newemail = email.trimEnd();
                newEmails.push({
                  ScriptId: scriptId,
                  UserId: emailList[newemail],
                });
              });

              console.log(newEmails);

              let { data } = await supabase.from("Sharing").insert(newEmails);

              console.log(data);
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
