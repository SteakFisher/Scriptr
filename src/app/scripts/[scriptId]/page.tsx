import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../../../database.types";
import ScriptForm from "@/components/ScriptForm";
import React from "react";
import AddCollabs from "@/components/addCollabs";

export default async function DisplayScript({
  params: { scriptId: id },
}: {
  params: { scriptId: string };
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  console.log(id);

  const { data, error } = await supabase
    .from("Scripts")
    .select(`id, Title, Description, Edits (Content)`)
    .eq("id", id);

  if (error) {
    return <div>Failed to load script</div>;
  }

  let input = "";

  let { data: users } = await supabase.from("Users").select("Author, Email");

  let emailList: { [key: string]: string } = {};

  if (users) {
    users.map((user) => {
      if (user.Email && user.Author) {
        emailList[user.Email] = user.Author;
      }
    });
  }

  console.log(emailList);

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
              Content: data[0].Edits[0].Content,
            }}
          />
        </div>
      ) : (
        <div>You dont have access</div>
      )}
    </>
  );
}
