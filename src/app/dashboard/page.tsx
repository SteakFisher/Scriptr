import Logout from "@/components/Logout";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../database.types";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Dashboard() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const { data } = await supabase
    .from("Scripts")
    .select("*")
    .order("Created_at", { ascending: false });
  console.log(data);

  return (
    <div>
      <div className="flex justify-between mt-6 ml-4 mr-4 rounded-md bg-gray-900 px-10 py-6">
        <div className={"flex"}>
          <span className={"text-3xl font-thin"}>Script</span>
          <span className={"flex font-serif italic text-4xl"}>R.</span>
        </div>

        <div className={"flex ml-auto"}>
          <div className={"flex "}>
            <button
              className={
                "border-2 px-8 py-2 mt-6 ml-auto mr-10 rounded-md hover:border-b-emerald-400 hover:scale-105 duration-200 ease-in-out"
              }
            >
              <Link href={"scripts/new"}>New Script</Link>
            </button>
          </div>
          <div className="border-2 px-2 py-2 rounded-md bg-gray-100 text-black hover:bg-gray-300 mr-4 mt-6 duration-200 ease-in-out hover:scale-90">
            <Logout />
          </div>
        </div>
      </div>
      <div className={"flex px-20 py-4"}>
        <p className={"text-3xl"}> Edits </p>
      </div>

      <div className="card w-full max-w-sm m-auto rounded-lg shadow-md h-auto overflow-hidden">
        <div className="card-header bg-gray-200 opacity-50 p-4">
          <h1 className="text-2xl font-bold">Date</h1>
          <h1 className="text-2xl font-bold">TIme</h1>
        </div>
        <div className="card-body p-6 bg-amber-400">
          <p className="text-gray-700 mb-4">Description</p>
        </div>
        <div className="card-footer bg-blue-600 opacity-80 p-4">
          <button className="button">Title</button>
        </div>
      </div>
    </div>
  );
}
