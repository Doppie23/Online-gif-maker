"use client";

import { useEffect, useState } from "react";
import "@/components/InOutSlider/input.css";

type Props = {
  /** HH:MM:SS */
  time: string;
};

function isMoreThan60(value: string): boolean {
  const parsed = parseInt(value);
  return parsed > 60;
}

function splitTime(time: string) {
  const [hour, minute, second] = time.split(":");
  return { hour, minute, second };
}

function TimeInput({ time }: Props) {
  const { hour, minute, second } = splitTime(time);
  const [hours, setHours] = useState(hour);
  const [minutes, setMinutes] = useState(minute);
  const [seconds, setSeconds] = useState(second);

  useEffect(() => {
    const { hour, minute, second } = splitTime(time);
    setHours(hour);
    setMinutes(minute);
    setSeconds(second);
  }, [time]);

  return (
    <div className="mt-2 flex flex-row rounded-md bg-gray-800 p-2">
      <InputElement value={hours} setter={setHours} />
      <div>:</div>
      <InputElement value={minutes} setter={setMinutes} />
      <div>:</div>
      <InputElement value={seconds} setter={setSeconds} />
    </div>
  );
}

function InputElement({
  value,
  setter,
}: {
  value: string;
  setter: (value: string) => void;
}) {
  const updateValue = (value: string, setter: (value: string) => void) => {
    if (isMoreThan60(value)) {
      setter("59");
    } else {
      if (value.length === 1) {
        value = "0" + value;
      }
      setter(value);
    }
  };

  return (
    <input
      className="w-6 bg-transparent text-center text-white outline-none"
      type="number"
      value={value}
      onChange={(e) => setter(e.target.value)}
      onBlur={(e) => updateValue(e.target.value, setter)}
    />
  );
}

export default TimeInput;
