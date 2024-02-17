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

  let user = await supabase.auth.getUser();

  if (user.data.user && user.data.user.id && user.data.user.email) {
    const { data: userData } = await supabase
      .from("Users")
      .upsert({ Author: user.data.user?.id, Email: user.data.user?.email });
    console.log(userData);
  }

  const { data } = await supabase
    .from("Scripts")
    .select("*")
    .order("Created_at", { ascending: false });

  return (
    <div>
      {/*Header*/}
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
      {/*Title*/}
      <div className={"flex px-20 py-4"}>
        <p className={"text-3xl"}> Edits </p>
      </div>
      {/*Templates*/}
      <div className={"flex flex-wrap"}>
        {data?.map((obj, index) => {
          if (!obj.Created_at) {
            obj.Created_at = "errorT";
          }
          let key = obj.id;
          return (
            <div
              key={obj.id}
              className={
                "ml-16 mt-10 hover:duration-200 hover:border-sky-200 hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] hover:rounded-xl"
              }
            >
              <div className="card_3 w-96 max-w-sm rounded-lg border-2 border-gray-900 hover:scale-105  duration-100 m-4">
                <div className="card-header bg-gray-900 p-4  overflow-hidden">
                  <p className="text-sm text-gray-400">
                    Date: {obj.Created_at.split("T")[0]}{" "}
                  </p>
                </div>

                <div className="card-body p-6 bg-gradient-to-r from-gray-900 border-s-2 border-emerald-400 h-40  overflow-hidden hover:border-none hover:duration-200">
                  <p className="text-gray-700 mb-4">{obj.Description}</p>
                </div>

                <div className="card-footer bg-gradient-to-r from-gray-900 p-4  overflow-hidden">
                  <button className="button text-xl">
                    <Link href={`/scripts/${key}`}>{obj.Title}</Link>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
