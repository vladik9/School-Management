'use client';
import React, { useState } from 'react';
import GenericModal from '@/components/generic/generic-modal';
import translations from '@/lib/translations';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users, Trash2 } from 'lucide-react';
import AddNewRecord from './add-new-record';

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
}: AddViewIntervalsProps) {

  const handleAddNewRecord = (id: number) => {
    setIsNewRecordModalOpen(true);
    setSelectedIntervalId(id);
  };

  const handleViewOrEditRecord = (id: number) => {
    handleViewEditRecords(id);
    // Add your edit logic here if needed
  };

  const handleRemoveRecord = (id: number) => {
    console.log("🚀 ~ handleRemoveRecord ~ id:", id);
    // Add your remove logic here for either an interval or a record
  };

  return (
    <GenericModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSave={handleSaveModal}
      title={translations.viewAddIntervals}
      description={translations.viewAddIntervalsDescription}
      width='800'
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
                <TableHead>{translations.action}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {intervals.map((interval) => (
                <TableRow key={interval.id}>
                  <TableCell  >{translations.inter} {interval.id}</TableCell>
                  <TableCell >
                    {/* View/Edit Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewOrEditRecord(interval.id)}
                        >
                          <Users className="h-4 w-4 mr-2" />
                          {translations.viewOrEdit}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[800px]">
                        <DialogHeader>
                          <DialogTitle>{translations.inter} {interval.id}</DialogTitle>
                        </DialogHeader>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>{translations.studentId}</TableHead>
                              <TableHead>{translations.startTime}</TableHead>
                              <TableHead>{translations.finalTime}</TableHead>
                              <TableHead>{translations.average}</TableHead>
                              <TableHead>{translations.action}</TableHead>
                              <TableHead>{translations.remove}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {records && records.length > 0 ? (
                              records.map((int: any) => (
                                <TableRow key={int.id}>
                                  <TableCell>{int.id}</TableCell>
                                  <TableCell>{int.startTime}</TableCell>
                                  <TableCell>{int.endTime}</TableCell>
                                  {/* TODO: Fix this math calculation */}
                                  <TableCell>
                                    {int.startTime && int.endTime
                                      ? parseInt(int.startTime) / parseInt(int.endTime)
                                      : '-'}
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleViewOrEditRecord(interval.id)}
                                    >
                                      <Users className="h-4 w-4 mr-2" />
                                      {translations.edit}
                                    </Button>
                                  </TableCell>
                                  <TableCell>
                                    {/* Record-level Remove Dialog */}
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                          <Trash2 className="h-4 w-4 mr-2" />
                                          {translations.remove}
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-[400px]">
                                        <DialogHeader>
                                          <DialogTitle>{translations.confirmRemoveRecordTitle}</DialogTitle>
                                        </DialogHeader>
                                        <p>{translations.confirmRemoveRecordMessage}</p>
                                        <DialogFooter className="space-x-2">
                                          <Button variant="outline">
                                            {translations.cancel}
                                          </Button>
                                          <Button
                                            variant="destructive"
                                            onClick={() => handleRemoveRecord(int.id)}
                                          >
                                            {translations.confirm}
                                          </Button>
                                        </DialogFooter>
                                      </DialogContent>
                                    </Dialog>
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
                      </DialogContent>
                    </Dialog>

                    {/* Interval-level Remove Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          {translations.remove}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[400px]">
                        <DialogHeader>
                          <DialogTitle>{translations.confirmRemoveRecordTitle}</DialogTitle>
                        </DialogHeader>
                        <p>{translations.confirmRemoveRecordMessage}</p>
                        <DialogFooter className="space-x-2">
                          <Button variant="outline">
                            {translations.cancel}
                          </Button>
                          <Button variant="destructive" onClick={() => handleRemoveRecord(interval.id)}>
                            {translations.confirm}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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
