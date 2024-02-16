"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../database.types";

type ScriptProps = {
  Title: string;
  Description: string;
  Content: string;
};

export default function NewScript() {
  const supabase = createClientComponentClient<Database>();

  let content = {} as ScriptProps;

  return (
    <div>
      <h1>New Script</h1>

      <form>
        <label>
          <Input
            type="text"
            onChange={(e) => {
              content["Title"] = e.target.value;
            }}
            defaultValue={"Title"}
          />
        </label>
        <br />
        <label>
          <Input
            type="text"
            onChange={(e) => {
              content["Description"] = e.target.value;
            }}
            defaultValue={"Description"}
          />
        </label>
        <br />
        <label>
          <Textarea
            onChange={(e) => {
              content["Content"] = e.target.value;
            }}
          />
        </label>
        <br />
        <button
          onClick={async (e) => {
            e.preventDefault();

            let { data: scriptData } = await supabase
              .from("Scripts")
              .insert({
                Title: content["Title"],
                Description: content["Description"],
              })
              .select("id");
            console.log(scriptData);
            if (!scriptData) {
              console.log("Error creating script");
              return;
            }

            await supabase.from("Edits").insert({
              Content: content["Content"],
              // @ts-ignore
              ScriptId: scriptData[0].id,
            });
          }}
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
}

// CREATE POLICY "Individuals can view their own edits" ON public."Edits" FOR
// SELECT
// USING (
//   auth.uid () = (
//     SELECT
// "Author"
// FROM
// public."Scripts"
// WHERE
// public."Scripts"."id" = public."Edits"."ScriptId"
// )
// );
