import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../../../database.types";
import ScriptForm from "@/components/ScriptForm";

export default async function DisplayScript({
  params: { id: id },
}: {
  params: { id: number };
}) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase
    .from("Scripts")
    .select(`id, Title, Description, Edits (Content)`)
    .eq("id", id);

  if (error) {
    return <div>Failed to load script</div>;
  }

  return (
    <>
      <ScriptForm
        script={{
          id: data[0].id,
          Title: data[0].Title,
          Description: data[0].Description,
          Content: data[0].Content,
        }}
      />
    </>
  );
}
