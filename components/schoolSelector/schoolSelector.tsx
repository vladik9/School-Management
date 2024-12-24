import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import translations from "@/lib/translations";
import { SchoolData } from "@/types/types";
import RemoveDialog from '../generic/remove-dialog';

interface SchoolSelectorProps {
  schools: SchoolData[];
  onSelectSchool: (schoolId: number) => void;
  onAddSchool: () => void;
  onRemoveSchool: (schoolId: number) => void;
}

export default function SchoolSelector({ schools, onSelectSchool, onAddSchool, onRemoveSchool }: SchoolSelectorProps) {
  return (
    <div>
      <Label htmlFor="school-select">{translations.chooseSchool}</Label>
      <Select onValueChange={(value) => onSelectSchool(parseInt(value))}>
        <SelectTrigger id="school-select">
          <SelectValue placeholder={translations.chooseSchool} />
        </SelectTrigger>
        <SelectContent>
          {schools.length > 0 ? (
            schools.map((school) => (
              <SelectItem key={school.id} value={school.id.toString()}>
                {school.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem disabled value="no-options">
              {translations.noSchoolsAvailable}
            </SelectItem>
          )}
        </SelectContent>
      </Select>
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outline" onClick={onAddSchool}>{translations.addSchool}</Button>
        {schools.length > 0 && <RemoveDialog title={translations.removeSchool} description=
          {translations.confirmRemoveSchool} confirmText={translations.removeSchool} cancelText={translations.cancel} onRemove={() => onRemoveSchool(schools[0].id)} id={schools[0].id} removeMessage={translations.removeSchool} />}
      </div>
    </div>
  );
}
