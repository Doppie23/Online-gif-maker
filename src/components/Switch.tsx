"use client";

import { useState } from "react";

type ActiveButton = "left" | "right";

type Props = {
  onChange: (activeButton: ActiveButton) => void;
};

function Switch({ onChange }: Props) {
  const [active, setActive] = useState<ActiveButton>("left");
  const deactiveColor = "#1F2937";
  const activeColor = "#4F46E5";

  return (
    <div className="w-full">
      <button
        onClick={() => {
          setActive("left");
          onChange("left");
        }}
        className="w-1/2 rounded-l-md"
        style={{
          backgroundColor: active === "left" ? activeColor : deactiveColor,
          color: active === "left" ? "white" : "#8A8577",
        }}
        type="button"
      >
        Video
      </button>
      <button
        onClick={() => {
          setActive("right");
          onChange("right");
        }}
        className="w-1/2 rounded-r-md"
        type="button"
        style={{
          backgroundColor: active === "right" ? activeColor : deactiveColor,
          color: active === "right" ? "white" : "#8A8577",
        }}
      >
        Gif
      </button>
    </div>
  );
}

export default Switch;
