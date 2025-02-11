"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import translations from "@/lib/translations";

interface TimePickerProps {
  label: string;
  onChange: (time: string) => void;
  id: string;
  value?: string;
}

export default function TimePicker({ label, id, onChange, value = "00:00,000" }: TimePickerProps) {
  const [time, setTime] = React.useState(value);

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    onChange(newTime);
  };

  const adjustTime = (unit: "minutes" | "seconds" | "milliseconds", increment: boolean) => {
    const [minutesSeconds, milliseconds] = time.split(",");
    const [minutes, seconds] = minutesSeconds.split(":");
    let newMinutes = Number.parseInt(minutes, 10);
    let newSeconds = Number.parseInt(seconds, 10);
    let newMilliseconds = Number.parseInt(milliseconds, 10);

    switch (unit) {
      case "minutes":
        newMinutes = (newMinutes + (increment ? 1 : -1) + 60) % 60;
        break;
      case "seconds":
        newSeconds = (newSeconds + (increment ? 1 : -1) + 60) % 60;
        break;
      case "milliseconds":
        newMilliseconds = (newMilliseconds + (increment ? 10 : -10) + 1000) % 1000;
        break;
    }

    handleTimeChange(
      `${newMinutes.toString().padStart(2, "0")}:${newSeconds.toString().padStart(2, "0")},${newMilliseconds.toString().padStart(3, "0")}`,
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, unit: "minutes" | "seconds" | "milliseconds") => {
    const value = e.target.value;
    const [minutesSeconds, milliseconds] = time.split(",");
    const [minutes, seconds] = minutesSeconds.split(":");
    let newTime = "";

    switch (unit) {
      case "minutes":
        newTime = `${value.padStart(2, "0")}:${seconds},${milliseconds}`;
        break;
      case "seconds":
        newTime = `${minutes}:${value.padStart(2, "0")},${milliseconds}`;
        break;
      case "milliseconds":
        newTime = `${minutes}:${seconds},${value.padStart(3, "0")}`;
        break;
    }

    if (/^[0-5][0-9]:[0-5][0-9],[0-9]{3}$/.test(newTime)) {
      handleTimeChange(newTime);
    }
  };

  const TimeUnit = ({ unit, value }: { unit: "minutes" | "seconds" | "milliseconds"; value: string; }) => (
    <div className="flex flex-col items-center">
      <Button
        size="sm"
        variant="outline"
        onClick={() => adjustTime(unit, true)}
        aria-label={`Increment ${unit}`}
        className="px-2 py-0 h-6"
      >
        ▲
      </Button>
      <Input
        type="text"
        id={`${id}-${unit}`}
        value={value}
        onChange={(e) => handleInputChange(e, unit)}
        className={`text-center p-0 h-8 ${unit === "milliseconds" ? "w-16" : "w-12"}`}
        maxLength={unit === "milliseconds" ? 3 : 2}
        aria-label={unit.charAt(0).toUpperCase() + unit.slice(1)}
      />
      <Button
        size="sm"
        variant="outline"
        onClick={() => adjustTime(unit, false)}
        aria-label={`Decrement ${unit}`}
        className="px-2 py-0 h-6"
      >
        ▼
      </Button>
    </div>
  );

  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center justify-center space-x-2">
        <div className="flex items-center space-x-1 pt-2 pb-2">
          <TimeUnit unit="minutes" value={time.split(":")[0]} />
          <span className="text-xl">:</span>
          <TimeUnit unit="seconds" value={time.split(":")[1].split(",")[0]} />
          <span className="text-xl">,</span>
          <TimeUnit unit="milliseconds" value={time.split(",")[1]} />
        </div>
      </div>
      <p className="text-sm text-muted-foreground flex flex-row-reverse pr-10 ">
        {translations.timeSelected}: {time}
      </p>
    </div>
  );
}
