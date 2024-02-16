import Logout from "@/components/Logout";

export default function Dashboard() {
  return (
    <div className="grid justify-items-end mr-8 mt-6">
      <div className="border-2 px-2 py-2 rounded-md bg-gray-100 text-black hover:bg-gray-300">
        <Logout />
      </div>
    </div>
  );
}
