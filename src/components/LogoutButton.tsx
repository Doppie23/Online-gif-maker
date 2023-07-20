"use client";

import { pb } from "@/lib/pocketbase";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    pb.authStore.clear();
    fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      logout
    </button>
  );
}

export default LogoutButton;
