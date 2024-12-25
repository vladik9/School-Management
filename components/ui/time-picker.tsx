'use client';

import * as React from "react";
import { Clock } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import translations from "@/lib/translations";

interface TimePickerProps {
  label: string;
  onChange: (time: string) => void;
  id: string;
  value?: Date | string;
}

export default function TimePicker({ label, id, onChange, value }: TimePickerProps) {
  const [time, setTime] = React.useState<string>(value || "");
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
  const seconds = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const handleTimeChange = (type: 'minute' | 'second', value: string) => {
    const [currentMinute, currentSecond] = time.split(':');
    const newTime = type === 'minute'
      ? `${value}:${currentSecond || '00'}`
      : `${currentMinute || '00'}:${value}`;
    setTime(newTime);
    onChange(newTime);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [minutes, seconds] = e.target.value.split(':');
    const newTime = minutes && seconds
      ? `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
      : e.target.value;
    setTime(newTime);
    onChange(newTime);
  };

  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`w-full justify-start text-left font-normal ${!time && "text-muted-foreground"}`}
          >
            <Clock className="mr-2 h-4 w-4" />
            {time ? time : translations.selectTime}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" portal={false}>
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-2">
              <Select onValueChange={(value) => handleTimeChange('minute', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={translations.minutes} />
                </SelectTrigger>
                <SelectContent>
                  {minutes.map((minute) => (
                    <SelectItem key={minute} value={minute}>
                      {minute}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => handleTimeChange('second', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={translations.seconds} />
                </SelectTrigger>
                <SelectContent>
                  {seconds.map((second) => (
                    <SelectItem key={second} value={second}>
                      {second}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Input
              type="text"
              id={id}
              value={time}
              onChange={handleInputChange}
              placeholder="MM:SS"
              pattern="[0-5][0-9]:[0-5][0-9]"
              className="w-full"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={() => setPopoverOpen(false)} // Close the popover on "OK" click
            >
              {translations.confirm}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <p className="text-sm text-muted-foreground">{translations.selectedTime}: {time || translations.noTimeSelected}</p>
    </div>
  );
}
