import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import translations from "@/lib/translations";
import { YearData } from "@/types/types";
import RemoveDialog from '../generic/remove-dialog';
import { arabicToRoman } from '@/utils/functions';

interface YearSelectorProps {
  years: YearData[];
  onSelectYear: (yearId: number) => void;
  onAddYear: () => void;
  onRemoveYear: (yearId: number) => void;

}

/**
 * A component for selecting a year and adding/removing years.
 *
 * This component displays a select list of years, allowing the user to select a year.
 * It also includes buttons to add a new year and remove the currently selected year.
 *
 * @param {YearData[]} years - An array of year data to display in the select list.
 * @param {function(number)} onSelectYear - A function to be called when a year is selected. It receives the selected year's ID as a parameter.
 * @param {function} onAddYear - A function to be called when the "Add Year" button is clicked.
 * @param {function(number)} onRemoveYear - A function to be called when the "Remove Year" button is clicked. It receives the ID of the year to be removed as a parameter.
 */
export default function YearSelector({ years, onSelectYear, onAddYear, onRemoveYear, }: YearSelectorProps) {

  return (
    <div style={{ marginTop: '20px' }}>
      {years.length > 0 && (
        <>
          <Label htmlFor="year-select">{translations.chooseYear}</Label>
          <Select onValueChange={(value) => onSelectYear(parseInt(value))}>
            <SelectTrigger id="year-select">
              <SelectValue placeholder={translations.chooseYear} />
            </SelectTrigger>
            <SelectContent>
              {years.length > 0 ? (
                years.map((year) => (
                  <SelectItem key={year.id} value={year.id.toString()}>
                    {arabicToRoman(parseInt(year.name))}
                  </SelectItem>
                ))
              ) : (
                <div>{translations.noYears}</div>
              )}
            </SelectContent>
          </Select>
        </>
      )}
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        {
          <Button variant="outline" onClick={onAddYear}>{translations.addYear}</Button>
        }
        {years.length > 0 && <RemoveDialog title={translations.removeYear} description={translations.confirmRemoveYear} confirmText={translations.removeYear} cancelText={translations.cancel} onRemove={() => onRemoveYear(years[0].id)} id={years[0].id} removeMessage={translations.removeYear} />}
      </div>
    </div>
  );
}
