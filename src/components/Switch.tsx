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
    <div className="flex w-full flex-row">
      <button
        onClick={() => {
          setActive("left");
          onChange("left");
        }}
        className={
          "w-1/2 rounded-l-md bg-gray-800 py-2 text-sm font-semibold text-gray-400 " +
          (active === "left" ? "" : "hover:bg-gray-700 hover:text-white")
        }
        style={{
          color: active === "left" ? "white" : undefined,
          border: active === "left" ? `0.2rem solid ${activeColor}` : "none",
        }}
        type="button"
      >
        <div>Video</div>
      </button>
      <button
        onClick={() => {
          setActive("right");
          onChange("right");
        }}
        className={
          "w-1/2 rounded-r-md bg-gray-800 py-2 text-sm font-semibold text-gray-400 " +
          (active === "right" ? "" : "hover:bg-gray-700 hover:text-white")
        }
        type="button"
        style={{
          color: active === "right" ? "white" : undefined,
          border: active === "right" ? `0.2rem solid ${activeColor}` : "none",
        }}
      >
        Gif
      </button>
    </div>
  );
}

export default Switch;
