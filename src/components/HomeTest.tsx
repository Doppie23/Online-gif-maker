"use client";

import { pb } from "@/lib/pocketbase";
import LogoutButton from "./LogoutButton";

function HomeTest() {
  return (
    <div>
      <div
        onClick={async () => {
          const data = {
            user: pb.authStore.model?.id,
            testInput: "test",
          };

          const res = await pb.collection("test").create(data);
          // const res = await pb.collection("test").delete("p26o6cik97demtk");
          console.log(res);
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
