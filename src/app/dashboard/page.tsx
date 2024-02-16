"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await fetch("/api/logout", {
          method: "POST",
        });

        router.refresh();
      }}
    >
      Logout
    </button>
  );
}
