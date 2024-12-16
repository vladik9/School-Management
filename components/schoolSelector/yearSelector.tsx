import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import translations from "@/lib/translations";
import { YearData } from "@/types/types";

interface YearSelectorProps {
  years: YearData[];
  onSelectYear: (yearId: number) => void;
  onAddYear: () => void;
  onRemoveYear: (yearId: number) => void;
}

export default function YearSelector({ years, onSelectYear, onAddYear, onRemoveYear, }: YearSelectorProps) {
  return (
    <div style={{ marginTop: '20px' }}>
      <Label htmlFor="year-select">{translations.chooseYear}</Label>
      {years.length > 0 && (
        <Select onValueChange={(value) => onSelectYear(parseInt(value))}>
          <SelectTrigger id="year-select">
            <SelectValue placeholder={translations.chooseYear} />
          </SelectTrigger>
          <SelectContent>
            {years.length > 0 ? (
              years.map((yearData) => (
                <SelectItem key={yearData.id} value={yearData.id.toString()}>
                  {yearData.id}
                </SelectItem>
              ))
            ) : (
              <div>{translations.noYears}</div>
            )}
          </SelectContent>
        </Select>
      )}
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        {
          <Button variant="outline" onClick={onAddYear}>{translations.addYear}</Button>
        }
        {years.length > 0 &&
          <Button variant="outline" onClick={() => onRemoveYear(years[0].id)}>{translations.removeYear}
          </Button>}
      </div>
    </div>
  );
}
