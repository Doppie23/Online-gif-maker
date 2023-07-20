"use client";

import { pb } from "@/lib/pocketbase";
import LogoutButton from "./LogoutButton";

function HomeTest() {
  return (
    <div>
      <div
        onClick={() => {
          const data = {
            user: pb.authStore.model?.id,
            testInput: "test",
          };

          pb.collection("test").create(data);
        }}
      >
        home
      </div>
      <div className="absolute right-0 top-0 m-3">
        <LogoutButton />
      </div>
    </div>
  );
}

export default HomeTest;
