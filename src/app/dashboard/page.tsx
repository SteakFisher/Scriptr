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
    <div className="grid justify-items-end mr-8 mt-6">
      <div className="border-2 px-2 py-2 rounded-md bg-gray-100 text-black hover:bg-gray-300">
        <Logout />
      </div>
      <br />
      <Link href={"scripts/new"}>New Script</Link>
    </div>
  );
}
