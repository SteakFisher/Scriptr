import ScriptForm from "@/components/ScriptForm";
import { ScriptProps } from "@/types/ScriptTypes";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../database.types";
import { cookies } from "next/headers";

export default async function History({
  params: { id: id },
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  let { data } = await supabase
    .from("Edits")
    .select("Content, Scripts(Title, Description)")
    .eq("id", id);

  console.log(data);

  if (!data || !data[0] || !data[0]["Scripts"]) {
    return <h1>No Access..</h1>;
  }

  return (
    <ScriptForm
      script={{
        Title: data[0]["Scripts"].Title,
        Description: data[0]["Scripts"].Description,
        Content: data[0].Content,
      }}
      save={false}
    />
  );
}
