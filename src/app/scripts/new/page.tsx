import ScriptForm from "@/components/ScriptForm";

export default function NewScript() {
  return <ScriptForm script={{}} />;
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
