"use client";

import Slider from "rc-slider";
import "@/components/PlayerControls/slider.css";
import { useEffect, useState } from "react";
import { formatTime, timeToSeconds } from "@/utils/formatTime";
import TimeInput from "./TimeInput";

type Props = {
  /** Lengte van clip in seconden */
  maxValue: number;
  onChange?: (valueLeft: number, valueRight: number) => void;
};

function PlayerControls({ maxValue, onChange }: Props) {
  const [value, setValue] = useState([0, maxValue]);

  const updateSliderValue = (time: string, valueToOverwrite: 0 | 1) => {
    const seconds = timeToSeconds(time);
    setValue((prev) => {
      if (valueToOverwrite === 0) {
        if (onChange) {
          onChange(seconds, prev[1]);
        }
        return [seconds, prev[1]];
      } else {
        if (onChange) {
          onChange(prev[0], seconds);
        }
        return [prev[0], seconds];
      }
    });
  };

  useEffect(() => {
    setValue([0, maxValue]);
  }, [maxValue]);

  return (
    <div>
      <div className="relative flex items-center">
        <Slider
          range
          allowCross={false}
          value={value}
          max={maxValue}
          onChange={(newValue) => {
            if (newValue instanceof Array) {
              setValue(newValue);
            }
          }}
          onAfterChange={(valueAfterChange) => {
            if (valueAfterChange instanceof Array) {
              if (onChange) {
                onChange(valueAfterChange[0], valueAfterChange[1]);
              }
            }
          }}
        />
      </div>
      <div className="mt-2 flex flex-row justify-between">
        <TimeInput
          time={formatTime(value[0])}
          onChange={(time) => updateSliderValue(time, 0)}
          maxValue={value[1]}
        />
        <TimeInput
          time={formatTime(value[1])}
          onChange={(time) => updateSliderValue(time, 1)}
          maxValue={maxValue}
        />
      </div>
    </div>
  );
}

export default PlayerControls;
