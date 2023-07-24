"use client";

import { useEffect, useState } from "react";
import "@/components/PlayerControls/input.css";
import { timeToSeconds, formatTime } from "@/utils/formatTime";

type Props = {
  /** HH:MM:SS */
  time: string;
  onChange: (time: string) => void;
  maxValue: number;
};

function TimeInput({ time, onChange, maxValue }: Props) {
  const { hour, minute, second } = splitTime(time);
  const [hours, setHours] = useState(hour);
  const [minutes, setMinutes] = useState(minute);
  const [seconds, setSeconds] = useState(second);

  const onTimeUpdated = () => {
    let newTime = `${hours}:${minutes}:${seconds}`;
    const TimeInSeconds = timeToSeconds(newTime);
    if (TimeInSeconds > maxValue) {
      newTime = formatTime(maxValue);
    }
    if (TimeInSeconds < 0) {
      newTime = "00:00:00";
    }
    onChange(newTime);
  };

  useEffect(() => {
    const { hour, minute, second } = splitTime(time);
    setHours(hour);
    setMinutes(minute);
    setSeconds(second);
  }, [time]);

  return (
    <div className="flex flex-row rounded-md bg-gray-800 p-2">
      <InputElement value={hours} setter={setHours} onUpdate={onTimeUpdated} />
      <div>:</div>
      <InputElement
        value={minutes}
        setter={setMinutes}
        onUpdate={onTimeUpdated}
      />
      <div>:</div>
      <InputElement
        value={seconds}
        setter={setSeconds}
        onUpdate={onTimeUpdated}
      />
    </div>
  );
}

function InputElement({
  value,
  setter,
  onUpdate,
}: {
  value: string;
  setter: (value: string) => void;
  onUpdate: () => void;
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
    onUpdate();
  };

  return (
    <input
      className="w-6 bg-transparent text-center text-white outline-none"
      type="number"
      min="0"
      value={value}
      onChange={(e) => setter(e.target.value)}
      onBlur={(e) => updateValue(e.target.value, setter)}
    />
  );
}

function isMoreThan60(value: string): boolean {
  const parsed = parseInt(value);
  return parsed > 60;
}

function splitTime(time: string) {
  const [hour, minute, second] = time.split(":");
  return { hour, minute, second };
}

export default TimeInput;
