"use client";

import Slider from "rc-slider";
import "@/components/slider.css";
import { useState } from "react";
import formatTime from "@/utils/formatTime";

type Props = {
  /** Lengte van clip in seconden */
  maxValue: number;
  onChange: (valueLeft: number, valueRight: number) => void;
};

function InOutSlider({ maxValue, onChange }: Props) {
  const [value, setValue] = useState([0, maxValue]);

  return (
    <div>
      <Slider
        range
        allowCross={false}
        value={value}
        onChange={(newValue) => {
          if (newValue instanceof Array) {
            setValue(newValue);
          }
        }}
        onAfterChange={(valueAfterChange) => {
          if (valueAfterChange instanceof Array) {
            onChange(valueAfterChange[0], valueAfterChange[1]);
          }
        }}
      />
      <div className="flex flex-row justify-between">
        <div className="mt-2 rounded-md bg-gray-800 p-2">
          {formatTime(value[0])}
        </div>
        <div className="mt-2 rounded-md bg-gray-800 p-2">
          {formatTime(value[1])}
        </div>
      </div>
    </div>
  );
}

export default InOutSlider;
