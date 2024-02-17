import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../../../database.types";
import ScriptForm from "@/components/ScriptForm";
import React from "react";
import AddCollabs from "@/components/addCollabs";

interface DataItem {
  Content: string;
  Updated_at: string;
}

export default async function DisplayScript({
  params: { scriptId: id },
}: {
  params: { scriptId: string };
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  let { data: users } = await supabase.from("Users").select("Author, Email");

  let emailList: { [key: string]: string } = {};

  if (users) {
    users.map((user) => {
      if (user.Email && user.Author) {
        emailList[user.Email] = user.Author;
      }
    });
  }

  const { data, error } = await supabase
    .from("Scripts")
    .select(`id, Title, Description, Edits (Content, Updated_at)`)
    .eq("id", id);

  if (error) {
    return <div>Failed to load script</div>;
  }

  let Edits: DataItem[] = data[0].Edits;

  // @ts-ignore
  Edits.sort((a, b) => new Date(b.Updated_at) - new Date(a.Updated_at));

  return (
    <>
      {data?.length > 0 ? (
        <div>
          <AddCollabs emailList={emailList} scriptId={data[0].id} />
          <ScriptForm
            script={{
              id: data[0].id,
              Title: data[0].Title,
              Description: data[0].Description,
              Content: Edits[0].Content,
            }}
            save={false}
            edits={Edits}
          />
        </div>
      ) : (
        <div>You dont have access</div>
      )}
    </>
  );
}
