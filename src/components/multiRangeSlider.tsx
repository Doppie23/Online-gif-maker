import { Dispatch, SetStateAction, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

type Props = {
  leftValue: number;
  setLeftvalue: Dispatch<SetStateAction<number>>;
  rightValue: number;
  setRightValue: Dispatch<SetStateAction<number>>;
  maxRange: number;
};

function MultiRangeSlider({
  leftValue,
  setLeftvalue,
  rightValue,
  setRightValue,
  maxRange,
}: Props) {
  const handleSliderChange = (newValues: number | number[]) => {
    if (newValues instanceof Array) {
      setLeftvalue(newValues[0]);
      setRightValue(newValues[1]);
    }
  };

  return (
    <>
      <Slider
        range
        min={0}
        max={maxRange}
        value={[leftValue, rightValue]}
        onChange={handleSliderChange}
      />
      <div className="flex justify-between">
        <span>In: {leftValue}</span>
        <span>Out: {rightValue}</span>
      </div>
    </>
  );
}

export default MultiRangeSlider;
