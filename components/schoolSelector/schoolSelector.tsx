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

/**
 * A component for selecting a school and adding/removing schools.
 *
 * This component displays a select list of schools, allowing the user to select a school.
 * It also includes buttons to add a new school and remove the currently selected school.
 *
 * @param {SchoolData[]} schools - An array of school data to display in the select list.
 * @param {function(number)} onSelectSchool - A function to be called when a school is selected. It receives the selected school's ID as a parameter.
 * @param {function} onAddSchool - A function to be called when the "Add School" button is clicked.
 * @param {function(number)} onRemoveSchool - A function to be called when the "Remove School" button is clicked. It receives the ID of the school to be removed as a parameter.
 */
export default function SchoolSelector({ schools, onSelectSchool, onAddSchool, onRemoveSchool }: SchoolSelectorProps) {
  return (
    <div>
      {schools.length > 0 && (<>
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
      </>
      )}
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outline" onClick={onAddSchool}>{translations.addSchool}</Button>
        {schools.length > 0 && <RemoveDialog title={translations.removeSchool} description=
          {translations.confirmRemoveSchool} confirmText={translations.removeSchool} cancelText={translations.cancel} onRemove={() => onRemoveSchool(schools[0].id)} id={schools[0].id} removeMessage={translations.removeSchool} />}
      </div>
    </div>
  );
}
