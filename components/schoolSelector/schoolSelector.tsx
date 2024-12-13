import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import translations from "@/lib/translations";
import { SchoolData } from "@/types/types";

interface SchoolSelectorProps {
  schools: SchoolData[];
  onSelectSchool: (schoolId: number) => void;
  onAddSchool: () => void;
}

export default function SchoolSelector({ schools, onSelectSchool, onAddSchool }: SchoolSelectorProps) {
  return (
    <div>
      <Label htmlFor="school-select">{translations.chooseSchool}</Label>
      <Select onValueChange={(value) => onSelectSchool(parseInt(value))}>
        <SelectTrigger id="school-select">
          <SelectValue placeholder={translations.chooseSchool} />
        </SelectTrigger>
        <SelectContent>
          {schools.map((school) => (
            <SelectItem key={school.id} value={school.id.toString()}>
              {school.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div style={{ marginTop: '10px', textAlign: 'right' }}>
        <Button variant="outline" onClick={onAddSchool}>{translations.addSchool}</Button>
      </div>
    </div>
  );
}
