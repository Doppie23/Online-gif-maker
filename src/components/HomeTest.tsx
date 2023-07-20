"use client";

import { pb } from "@/lib/pocketbase";
import LogoutButton from "./LogoutButton";

function HomeTest() {
  return (
    <div>
      <div
        onClick={() => {
          pb.collection("test")
            .getOne("0i9rmf14t9hdvue")
            .then((e) => {
              console.log(e);
            });
        }}
      >
        home
      </div>
      <div className="absolute top-0 right-0 m-3">
        <LogoutButton />
      </div>
    </div>
  );
}

export default HomeTest;
