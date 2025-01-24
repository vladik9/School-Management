'use client';
import React, { useState } from 'react';
import GenericModal from '@/components/generic/generic-modal';
import translations from '@/lib/translations';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import AddViewRecord from './add-view-record';
import RemoveDialog from '../generic/remove-dialog';
import SimpleDialog from '../generic/simple-dialog';
import { IntervalData, RecordData, StudentData, TestData } from '@/types/types';
import { Users } from 'lucide-react';
import TimePicker from '../ui/time-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import PaginationButtons from '../ui/pagination-buttons';
import { paginationConstants } from '@/utils/dataEnums';

interface AddViewIntervalsProps {
  intervals: IntervalData[];
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSaveModal: () => void;
  newRecord: any;
  setNewRecord: (data: { studentId: number, value: string; }) => void;
  records: RecordData[];
  students: StudentData[];
  handleSaveNewRecord: () => void;
  handleUpdateRecord: (recordId: number, newRecord: RecordData) => void;
  setSelectedIntervalId: (id: number) => void;
  handleViewEditRecords: (id: number) => Promise<void>;
  isNewRecordModalOpen: boolean;
  setIsNewRecordModalOpen: (isOpen: boolean) => void;
  handleRemoveInterval: (id: number) => void;
  handleRemoveRecord: (id: number) => void;
  tests: TestData[];
  testId: number;
}

/**
 * This component renders a modal for adding and viewing intervals. It displays a list of all the intervals
 * associated with the current test, and allows the user to add new intervals and view/edit the records
 * associated with each interval. It also includes a pagination component to allow the user to navigate
 * between pages of intervals.
 *
 * @param {boolean} isModalOpen - Whether the modal should be open or not.
 * @param {function} handleCloseModal - A function to call when the user wants to close the modal.
 * @param {function} handleSaveModal - A function to call when the user wants to save the modal.
 * @param {function} handleUpdateRecord - A function to call when the user wants to update a record.
 * @param {RecordData} newRecord - The new record that the user wants to add.
 * @param {function} setNewRecord - A function to call when the user wants to set a new record.
 * @param {RecordData[]} records - The records associated with the current interval.
 * @param {StudentData[]} students - The students associated with the current test.
 * @param {function} handleSaveNewRecord - A function to call when the user wants to save a new record.
 * @param {function} setSelectedIntervalId - A function to call when the user wants to set a new selected interval id.
 * @param {function} handleViewEditRecords - A function to call when the user wants to view or edit records.
 * @param {boolean} isNewRecordModalOpen - Whether the add new record modal should be open or not.
 * @param {function} setIsNewRecordModalOpen - A function to call when the user wants to set whether the add new record modal should be open or not.
 * @param {function} handleRemoveInterval - A function to call when the user wants to remove an interval.
 * @param {function} handleRemoveRecord - A function to call when the user wants to remove a record.
 * @param {TestData[]} tests - The tests associated with the current school.
 * @param {number} testId - The ID of the current test.
 */
export default function AddViewIntervals({
  intervals,
  isModalOpen,
  handleCloseModal,
  handleSaveModal,
  handleUpdateRecord: handleUpdateRecordGlobal,
  newRecord,
  setNewRecord,
  records,
  students,
  handleSaveNewRecord,
  setSelectedIntervalId,
  handleViewEditRecords,
  isNewRecordModalOpen,
  setIsNewRecordModalOpen,
  handleRemoveInterval,
  handleRemoveRecord,
  tests,
  testId,
}: AddViewIntervalsProps) {
  const [isViewEditRecordsModalOpen, setIsViewEditRecordsModalOpen] = React.useState(false);
  const [currentIntervalPage, setCurrentIntervalPage] = useState(0);

  const INTERVALS_PER_PAGE = paginationConstants.INTERVALS_PER_PAGE;

  /**
   * Advances to the next page of intervals.
   *
   * This function increments the current interval page state, allowing
   * the user to navigate to the next set of intervals in the list.
   */
  const handleNextIntervalPage = () => {
    setCurrentIntervalPage((prevPage) => prevPage + 1);
  };

  /**
   * Moves to the previous page of intervals.
   *
   * This function decrements the current interval page state, allowing
   * the user to navigate to the previous set of intervals in the list.
   * If the current interval page is 0, it does not change the state.
   */
  const handlePreviousIntervalPage = () => {
    setCurrentIntervalPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  /**
   * Paginates the given list of intervals.
   *
   * This function takes a list of intervals and returns a slice of it, based on the current page number.
   * The number of items per page is determined by the INTERVALS_PER_PAGE constant.
   *
   * @param {IntervalData[]} studentList - The list of intervals to paginate.
   * @returns {IntervalData[]} - The paginated list of intervals.
   */
  const paginatedInterval = (studentList: IntervalData[]) => {
    const startIndex = currentIntervalPage * INTERVALS_PER_PAGE;
    return studentList.slice(startIndex, startIndex + INTERVALS_PER_PAGE);
  };

  /**
   * Handles opening the "Add New Record" modal.
   *
   * When this function is called, it sets the selected interval ID and opens the "Add New Record" modal.
   *
   * @param {number} id - The ID of the interval associated with the record to be added.
   */
  const handleAddNewRecord = (id: number) => {
    setIsNewRecordModalOpen(true);
    setSelectedIntervalId(id);
  };

  /**
   * Handles viewing or editing an interval record.
   *
   * This function is a simple wrapper around the `handleViewEditRecords` function.
   * It takes an interval ID and passes it to `handleViewEditRecords` to handle the
   * rest of the logic.
   *
   * @param {number} id - The ID of the interval record to be viewed/edited.
   */
  const handleViewOrEditRecord = (id: number) => {
    handleViewEditRecords(id);
  };
  const { baremType, barem = translations.none } = tests.find((test) => test.id === testId) || {};

  /**
   * Handles updating a record from the database.
   *
   * This function is called when the user submits the "View/Edit Records" modal with changes.
   * It calls the `handleUpdateRecordGlobal` function with the provided record ID and newRecord data,
   * and then closes the "View/Edit Records" modal.
   * @param {number} recordId - The ID of the record to be updated.
   * @param {RecordData} newRecord - The updated record data.
   */
  const handleUpdateRecord = (recordId: number, newRecord: RecordData) => {
    handleUpdateRecordGlobal(recordId, newRecord);
    /**
     * Handles updating a record from the database.
     *
     * This function is called when the user submits the "View/Edit Records" modal with changes.
     * It calls the `handleUpdateRecordGlobal` function with the provided record ID and newRecord data,
     * and then closes the "View/Edit Records" modal.
     * @param {number} recordId - The ID of the record to be updated.
     * @param {RecordData} newRecord - The updated record data.
     */
    setIsViewEditRecordsModalOpen(false);
  };

  /**
   * Handles a change in the input field.
   *
   * This function updates the value of the `newRecord` state based on the input change event.
   * If the value is a string, it is directly updated. Otherwise, the `value` property of the event
   * target is used to update the `newRecord` state.
   * @param {string | React.ChangeEvent<HTMLInputElement>} value - The new value or the change event.
   */
  const onValueChange = (value: string | React.ChangeEvent<HTMLInputElement>) => {
    if (typeof value === 'string') {
      setNewRecord(prev => ({ ...prev, value }));
    } else {
      setNewRecord(prev => ({ ...prev, value: value.target.value }));
    }
  };

  /**
   * Returns the correct input based on the selected barem type.
   *
   * The function takes a barem type as a parameter and returns the correct input
   * component to render based on the barem type.
   *
   * The available barem types are:
   * - 1: Metres
   * - 2: Centimeters
   * - 3: Time
   * - 4: Number
   *
   * The function returns null if the barem type is not one of the above.
   *
   * @param {number} baremType - The barem type.
   * @returns {React.ReactNode} The rendered input component.
   */
  const inputBasedOnBaremType = (baremType: number,) => {
    switch (baremType) {
      case 1:
        return (
          <>
            <Label className="mb-5" htmlFor="docName">{translations.enterNumberOfMetres}</Label>
            <Input
              id="meters"
              type="number"
              placeholder={translations.enterNumberOfMetresPlaceholder}
              value={newRecord.value || ''}
              onChange={onValueChange}
            />
          </>
        );
      case 2:
        return (
          <>
            <Label className="mb-5" htmlFor="docName">{translations.enterNumberOfCentimeters}</Label>
            <Input
              id="centimeters"
              type="number"
              placeholder={translations.eneterNumberOfCentimetersPlaceholder}
              value={newRecord.value || ''}
              onChange={onValueChange}
            />
          </>);
      case 3:
        return (
          <TimePicker
            label={translations.time}
            id="startTime"
            value={newRecord.value}
            onChange={onValueChange}
          />

        );
      case 4:
        return (
          <>
            <Label className="mb-5" htmlFor="docName">{translations.enterNumber}</Label><Input
              id="number"
              type="number"
              placeholder={translations.enterNumberPlaceholder}
              value={newRecord.value}
              onChange={onValueChange}
            />
          </>);
      default:
        return (null);
    }
  };
  /**
   * Computes the average based on the barem type.
   *
   * Given a barem type, a result, and a barem, this function computes the average
   * and returns it as a string with 2 decimal places.
   * @param {number} baremType - The barem type.
   * @param {string | number} result - The result value.
   * @param {string | number} barem - The barem value.
   * @returns {string | null} The computed average, or null if the barem type is unknown.
   */
  const averageBasedOnBaremType = (baremType: number, result: any, barem: any) => {
    switch (baremType) {
      case 1:
        return (result / barem).toFixed(2);
      case 2:
        return (result / barem).toFixed(2);
      case 3:
        // Extract [minutes, seconds] from both values
        const [rM, rS] = result.split(':').map(Number);
        const [bM, bS] = barem.split(':').map(Number);

        // Convert them to total seconds
        const totalResultSeconds = rM * 60 + rS;
        const totalBaremSeconds = bM * 60 + bS;

        // Calculate the difference
        const difference = totalResultSeconds / totalBaremSeconds;

        // Return a float with 2 decimal places
        return Number(difference.toFixed(2));
      case 4:
        return (result / barem).toFixed(2);
      default:
        return null;
    }
  };
  return (
    <GenericModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSave={handleSaveModal}
      title={translations.viewAddIntervals}
      description={translations.viewAddIntervalsDescription}
      width='800'
      isSaveRequired={false}
    >
      <div className="space-y-4">
        {!intervals || intervals.length === 0 ? (
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <p>{translations.noIntervals}</p>
          </div>
        ) : (
          <Table >
            <TableHeader>
              <TableRow>
                <TableHead>{translations.intervalName}</TableHead>
                <TableHead>{translations.viewOrEdit}</TableHead>
                <TableHead>{translations.removeInterval}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedInterval(intervals).map((interval, index: number) => {
                const actualIndex = currentIntervalPage * INTERVALS_PER_PAGE + index;
                return (
                  <TableRow key={interval.id}>
                    <TableCell>{translations.inter} {actualIndex + 1}</TableCell>
                    <TableCell>
                      {/* View/Edit Dialog */}
                      <SimpleDialog title={`${translations.inter} - ${actualIndex + 1}`} description={translations.viewOrEdit} triggerButtonTitle={translations.viewOrEdit} onOpen={() => handleViewOrEditRecord(interval.id)} id={interval.id}
                      >
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>{translations.studentId}</TableHead>
                              <TableHead>{translations.result}</TableHead>
                              <TableHead>{translations.barem}</TableHead>
                              <TableHead>{translations.score}</TableHead>
                              <TableHead>{translations.edit}</TableHead>
                              <TableHead>{translations.removeRecord}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {records && records.length > 0 ? (
                              records.map((int: any) => (
                                <TableRow key={int.id}>
                                  <TableCell>{int.studentGeneratedId}</TableCell>
                                  <TableCell>{int.value}</TableCell>
                                  <TableCell>{barem}</TableCell>
                                  <TableCell>
                                    {averageBasedOnBaremType(baremType, int.value, barem)}
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setNewRecord(int);
                                        setIsViewEditRecordsModalOpen(true);
                                      }}
                                    >
                                      <Users className="h-4 w-4 mr-2" />
                                      {translations.edit}
                                    </Button>
                                    <AddViewRecord isModalOpen={isViewEditRecordsModalOpen}
                                      modalTitle={translations.editRecord} modalDescription={translations.editRecordDescription}
                                      handleCloseModal={() => setIsViewEditRecordsModalOpen(false)} handleSaveModal={handleUpdateRecord} students={students} newRecord={newRecord} setNewRecord={setNewRecord}
                                    >
                                      {inputBasedOnBaremType(baremType)}
                                    </AddViewRecord>
                                  </TableCell>
                                  <TableCell>
                                    {/* Record-level Remove Dialog */}
                                    <RemoveDialog title={translations.removeRecord}
                                      description={translations.confirmRemoveRecord} confirmText={translations.removeRecord}
                                      cancelText={translations.cancel}
                                      onRemove={handleRemoveRecord}
                                      removeMessage={translations.removeRecord}
                                      id={int.id} />
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={6}>
                                  <p style={{ marginTop: '10px', textAlign: 'center' }}>
                                    {translations.noRecords}
                                  </p>
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                        <div style={{ marginTop: '10px', textAlign: 'right' }}>
                          <Button variant="outline" onClick={() => handleAddNewRecord(interval.id)}>
                            {translations.addRecord} <span>+</span>
                          </Button>
                        </div>
                      </SimpleDialog>
                    </TableCell>
                    <TableCell>
                      {/* Interval-level Remove Dialog */}
                      <RemoveDialog
                        title={translations.removeInterval}
                        description={translations.confirmRemoveInterval}
                        confirmText={translations.removeInterval}
                        cancelText={translations.cancel}
                        onRemove={handleRemoveInterval}
                        removeMessage={translations.removeInterval}
                        id={interval.id} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
        <div style={{ marginTop: '10px', textAlign: 'right' }}>
          <Button variant="outline" onClick={handleSaveModal}>
            {translations.addInterval} <span>+</span>
          </Button>
        </div>
        <PaginationButtons itemSize={intervals.length} itemsPerPage={INTERVALS_PER_PAGE} currentPage={currentIntervalPage} handlePreviousPage={handlePreviousIntervalPage} handleNextPage={handleNextIntervalPage} />
      </div>
      <AddViewRecord
        modalTitle={translations.addNewRecord}
        modalDescription={translations.addNewRecordDescription}
        isModalOpen={isNewRecordModalOpen}
        handleCloseModal={() => setIsNewRecordModalOpen(false)}
        handleSaveModal={handleSaveNewRecord}
        students={students}
        newRecord={newRecord}
        setNewRecord={setNewRecord}
      >
        {inputBasedOnBaremType(baremType)}
      </AddViewRecord>

    </GenericModal>
  );
};
