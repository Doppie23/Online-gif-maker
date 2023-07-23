"use client";

import PlayerControls from "@/components/PlayerControls/PlayerControls";
import ReactPlayer from "react-player";

export default function Home() {
  return (
    <div className="m-auto w-1/2">
      <div>
        <ReactPlayer url="/testvideo.mp4" width={""} height={""} />
        <PlayerControls
          maxValue={120}
          onChange={(l, r) => {
            console.log(l, r);
          }}
        />
      </div>
    </div>
  );
}
