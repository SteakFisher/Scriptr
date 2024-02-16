"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../database.types";
import { ScriptProps } from "@/types/ScriptTypes";
import { useRouter } from "next/navigation";

export default function ScriptForm({ script }: { script: ScriptProps }) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  return (
    <div>
      <h1>New Script</h1>

      <form>
        <label>
          <Input
            type="text"
            onChange={(e) => {
              script["id"] = e.target.value;
            }}
            defaultValue={script["id"] ? script["id"] : "id"}
          />
        </label>
        <label>
          <Input
            type="text"
            onChange={(e) => {
              script["Title"] = e.target.value;
            }}
            defaultValue={script["Title"] ? script["Title"] : "Title"}
          />
        </label>
        <br />
        <label>
          <Input
            type="text"
            onChange={(e) => {
              script["Description"] = e.target.value;
            }}
            defaultValue={
              script["Description"] ? script["Description"] : "Description"
            }
          />
        </label>
        <br />
        <label>
          <Textarea
            onChange={(e) => {
              script["Content"] = e.target.value;
            }}
            defaultValue={script["Content"] ? script["Content"] : "Content"}
          />
        </label>
        <br />
        <button
          onClick={async (e) => {
            e.preventDefault();

            let { data: scriptData } = await supabase
              .from("Scripts")
              .upsert({
                id: script["id"],
                Title: script["Title"],
                Description: script["Description"],
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
      </form>
    </div>
  );
}
