import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../../../database.types";
import ScriptForm from "@/components/ScriptForm";

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

  return (
    <>
      {data?.length > 0 ? (
        <ScriptForm
          script={{
            id: data[0].id,
            Title: data[0].Title,
            Description: data[0].Description,
            Content: data[0].Edits[0].Content,
          }}
        />
      ) : (
        <div>You don't have access</div>
      )}
    </>
  );
}
