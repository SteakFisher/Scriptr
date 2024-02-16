import Logout from "@/components/Logout";

export default function Dashboard() {
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
    </div>
  );
}
