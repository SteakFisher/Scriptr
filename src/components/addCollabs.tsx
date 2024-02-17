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

export default function AddCollabs({
  emailList,
  scriptId,
}: {
  emailList: { [key: string]: string };
  scriptId: string;
}) {
  let input = "";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Collaborators</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            {"Add collaborator emails [seperated by commas]"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
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
            type="submit"
            onClick={() => {
              let emails = input.split(",");
              let newEmails: object[] = [];
              emails.map((email) => {
                email = email.toLowerCase();
                email = email.trimStart();
                email = email.trimEnd();
                newEmails.push({
                  ScriptId: scriptId,
                  UserId: emailList[email],
                });
              });
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
