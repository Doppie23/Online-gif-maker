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

  return <button onClick={handleLogout}>logout</button>;
}

export default LogoutButton;
