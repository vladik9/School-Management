import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import translations from "@/lib/translations";
import { YearData } from "@/types/types";
import { toRoman } from "@/utils/functions";

interface YearSelectorProps {
  years: YearData[];
  onSelectYear: (yearId: number) => void;
  onAddYear: () => void;
}

export default function YearSelector({ years, onSelectYear, onAddYear }: YearSelectorProps) {
  return (
    <div style={{ marginTop: '20px' }}>
      <Label htmlFor="year-select">{translations.chooseYear}</Label>
      {years.length > 0 && (
        <Select onValueChange={(value) => onSelectYear(parseInt(value))}>
          <SelectTrigger id="year-select">
            <SelectValue placeholder={translations.chooseYear} />
          </SelectTrigger>
          <SelectContent>
            {years.map((yearData) => (
              <SelectItem key={yearData.id} value={yearData.id.toString()}>
                {toRoman(yearData.id)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <div style={{ marginTop: '10px', textAlign: 'right' }}>
        <Button variant="outline" onClick={onAddYear}>{translations.addYear}</Button>
      </div>
    </div>
  );
}
