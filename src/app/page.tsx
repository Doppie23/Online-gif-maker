"use client";

import InOutSlider from "@/components/InOutSlider/InOutSlider";

export default function Home() {
  return (
    <div className="w-1/2">
      <InOutSlider
        maxValue={120}
        onChange={(l, r) => {
          console.log(l, r);
        }}
      />
    </div>
  );
}
