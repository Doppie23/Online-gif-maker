"use client";

import PlayerEditor from "@/components/PlayerEditor";

export default function Home() {
  return (
    <PlayerEditor
      src="/testvideo.mp4"
      onInOutChange={(l, r) => console.log(l, r)}
    />
  );
}
