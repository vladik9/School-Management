'use client';
import React from 'react';
import GenericModal from '@/components/generic/generic-modal';
import translations from '@/lib/translations';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import AddNewRecord from './add-new-record';
import RemoveDialog from '../generic/remove-dialog';
import SimpleDialog from '../generic/simple-dialog';
import ViewEditDialog from '../generic/view-edit-dialog';

interface AddViewIntervalsProps {
  intervals: any[];
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSaveModal: () => void;
  newRecord: any;
  setNewRecord: (data: { name: string; }) => void;
  records: any[];
  students: any[];
  handleSaveNewRecord: () => void;
  setSelectedIntervalId: (id: number) => void;
  handleViewEditRecords: (id: number) => Promise<void>;
  isNewRecordModalOpen: boolean;
  setIsNewRecordModalOpen: (isOpen: boolean) => void;
  handleRemoveInterval: (id: number) => void;
  handleRemoveRecord: (id: number) => void;
  barem: string;

}

export default function AddViewIntervals({
  intervals,
  isModalOpen,
  handleCloseModal,
  handleSaveModal,
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
  barem = translations.none,
}: AddViewIntervalsProps) {

  const handleAddNewRecord = (id: number) => {
    setIsNewRecordModalOpen(true);
    setSelectedIntervalId(id);
  };

  const handleViewOrEditRecord = (id: number) => {
    handleViewEditRecords(id);
    // Add your edit logic here if needed
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
                    <SimpleDialog title={`${translations.inter} - ${interval.id}`} description={translations.viewOrEdit} triggerButtonTitle={translations.viewOrEdit} onOpen={() => handleViewOrEditRecord(interval.id)} id={interval.id}
                    >
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>{translations.studentId}</TableHead>
                            <TableHead>{translations.startTime}</TableHead>
                            <TableHead>{translations.finalTime}</TableHead>
                            <TableHead>{translations.barem}</TableHead>
                            <TableHead>{translations.average}</TableHead>
                            <TableHead>{translations.edit}</TableHead>
                            <TableHead>{translations.removeRecord}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {records && records.length > 0 ? (
                            records.map((int: any) => (
                              <TableRow key={int.id}>
                                <TableCell>{int.id}</TableCell>
                                <TableCell>{int.startTime}</TableCell>
                                <TableCell>{int.endTime}</TableCell>
                                <TableCell>{barem}</TableCell>
                                {/* TODO: Fix this math calculation */}
                                <TableCell>
                                  {int.startTime && int.endTime
                                    ? parseInt(int.startTime) / parseInt(int.endTime)
                                    : '-'}
                                </TableCell>
                                <TableCell>
                                  {/* //TODO - fix this as not having anything to edit */}
                                  <ViewEditDialog title={translations.edit} description={translations.editRecord} onOpen={() => handleViewOrEditRecord(interval.id)} triggerButtonTitle={translations.edit} onSave={handleSaveNewRecord} id={int.id} cancelText={translations.cancel} confirmText={translations.update}>
                                    <span>EDIT</span>
                                  </ViewEditDialog>
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
      </div>
      <AddNewRecord
        isModalOpen={isNewRecordModalOpen}
        handleCloseModal={() => setIsNewRecordModalOpen(false)}
        handleSaveModal={handleSaveNewRecord}
        students={students}
        newRecord={newRecord}
        setNewRecord={setNewRecord}
      />
    </GenericModal>
  );
}
