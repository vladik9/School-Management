'use client';
import React, { useState } from 'react';
import GenericModal from '@/components/generic/generic-modal';
import translations from '@/lib/translations';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import AddViewRecord from './add-view-record';
import RemoveDialog from '../generic/remove-dialog';
import SimpleDialog from '../generic/simple-dialog';
import { IntervalData, RecordData, TestData } from '@/types/types';
import { Users } from 'lucide-react';
import TimePicker from '../ui/time-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import PaginationButtons from '../ui/pagination-buttons';
import { paginationConstants } from '@/utils/dataEnums';

interface AddViewIntervalsProps {
  intervals: any[];
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSaveModal: () => void;
  newRecord: any;
  setNewRecord: (data: { studentId: number, value: string; }) => void;
  records: any[];
  students: any[];
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

  const STUDENTS_PER_PAGE = paginationConstants.INTERVALS_PER_PAGE;

  const handleNextIntervalPage = () => {
    setCurrentIntervalPage((prevPage) => prevPage + 1);
  };

  const handlePreviousIntervalPage = () => {
    setCurrentIntervalPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const paginatedInterval = (studentList: IntervalData[]) => {
    const startIndex = currentIntervalPage * STUDENTS_PER_PAGE;
    return studentList.slice(startIndex, startIndex + STUDENTS_PER_PAGE);
  };

  const handleAddNewRecord = (id: number) => {
    setIsNewRecordModalOpen(true);
    setSelectedIntervalId(id);
  };

  const handleViewOrEditRecord = (id: number) => {
    handleViewEditRecords(id);
  };
  const { baremType, barem = translations.none } = tests.find((test) => test.id === testId) || {};

  const handleUpdateRecord = (recordId: number, newRecord: RecordData) => {
    handleUpdateRecordGlobal(recordId, newRecord);
    setIsViewEditRecordsModalOpen(false);
  };

  const onValueChange = (value: string | React.ChangeEvent<HTMLInputElement>) => {
    if (typeof value === 'string') {
      setNewRecord(prev => ({ ...prev, value }));
    } else {
      setNewRecord(prev => ({ ...prev, value: value.target.value }));
    }
  };

  const inputBasedOnBaremType = (baremType: number) => {
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
              {intervals.map((interval, index) => (
                <TableRow key={interval.id}>
                  <TableCell>{translations.inter} {index + 1}</TableCell>
                  <TableCell>
                    {/* View/Edit Dialog */}
                    <SimpleDialog title={`${translations.inter} - ${index + 1}`} description={translations.viewOrEdit} triggerButtonTitle={translations.viewOrEdit} onOpen={() => handleViewOrEditRecord(interval.id)} id={interval.id}
                    >
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>{translations.studentId}</TableHead>
                            <TableHead>{translations.result}</TableHead>
                            <TableHead>{translations.barem}</TableHead>
                            <TableHead>{translations.average}</TableHead>
                            {/* // TODO -- fix this to be real value/ */}
                            <TableHead>{translations.edit}</TableHead>
                            <TableHead>{translations.removeRecord}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {records && records.length > 0 ? (
                            records.map((int: any) => (
                              <TableRow key={int.id}>
                                <TableCell>{int.studentGeneratedId}</TableCell>
                                {/* //TODO - fix this to be ID of the stundet not DB Id */}
                                <TableCell>{int.value}</TableCell>
                                <TableCell>{barem}</TableCell>
                                {/* TODO: Fix this math calculation and average it should be calculate based on barem */}
                                <TableCell>
                                  avearge
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
                                  {/* //TODO - fix this to be a specific component render based on barem type */}
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
              ))}
            </TableBody>
          </Table>
        )}
        <div style={{ marginTop: '10px', textAlign: 'right' }}>
          <Button variant="outline" onClick={handleSaveModal}>
            {translations.addInterval} <span>+</span>
          </Button>
        </div>
        <PaginationButtons itemSize={intervals.length} itemsPerPage={intervals.length} currentPage={currentIntervalPage} handlePreviousPage={handlePreviousIntervalPage} handleNextPage={handleNextIntervalPage} />
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
