import Logout from "@/components/Logout";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../database.types";
import { cookies } from "next/headers";
import Link from "next/link";

export default function Dashboard() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  return (
    <div className="flex justify-between mt-6">
      <div>
        <button className={"border-2 px-8 py-2 rounded-md "}>
          Start Writing
        </button>
      </div>
      <div className="border-2 px-2 py-2 rounded-md bg-gray-100 text-black hover:bg-gray-300 mr-7">
        <Logout />
      </div>
      <br />
      <Link href={"scripts/new"}>New Script</Link>
    </div>
  );
}
