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
  setSelectedIntervalId
}: AddViewIntervalsProps) {
  const [isNewRecordModalOpen, setIsNewRecordModalOpen] = useState(false);

  const handleSaveNewInterval = () => {
    handleSaveModal();
  };

  const handleAddNewRecord = (id: number) => {
    console.log("🚀 ~ handleAddNewRecord ~ id:", id);
    setIsNewRecordModalOpen(true);
    setSelectedIntervalId(id);
  };

  const handleRemoveRecord = (id: number) => {
    console.log("🚀 ~ handleRemoveRecord ~ id:", id);
    // Add your remove logic here

  };

  console.log("intervals", intervals);
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
          <Table className="w-full text-center">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">{translations.intervalName}</TableHead>
                <TableHead className="w-1/3">{translations.action}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {intervals.length > 0 && intervals.map((interval) => (
                <TableRow key={interval.id}>
                  <TableCell className="w-1/3">{translations.inter} {interval.id}</TableCell>
                  <TableCell className="w-1/3 flex justify-center space-x-2">
                    {/* View Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4 mr-2" />
                          {translations.viewOrEdit}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[800px]">
                        <DialogHeader>
                          <DialogTitle>{translations.inter} {interval.id}</DialogTitle>
                        </DialogHeader>
                        <Table className="w-full text-center">
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-1/3">{translations.studentId}</TableHead>
                              <TableHead className="w-1/3">{translations.startTime}</TableHead>
                              <TableHead className="w-1/3">{translations.finalTime}</TableHead>
                              <TableHead className="w-1/3">{translations.average}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {records && records.length > 0 ? (
                              records.map((int: any) => (
                                <TableRow key={int.id}>
                                  <TableCell className="w-1/3">{int.id}</TableCell>
                                  <TableCell className="w-1/3">{int.points}</TableCell>
                                  <TableCell className="w-1/3">{int.finalTime}</TableCell>
                                  <TableCell className="w-1/3">{int.average}</TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={4}>
                                  <p style={{ marginTop: '10px', textAlign: 'center' }}>{translations.noRecords}</p>
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                        <div style={{ marginTop: '10px', textAlign: 'right' }}>
                          <Button variant="outline" onClick={(id) => handleAddNewRecord(interval.id)}>
                            {translations.addRecord} <span>+</span>
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    {/* Remove Dialog */}
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
          <Button variant="outline" onClick={() => handleSaveNewInterval()}>
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
        records={records}
      />
    </GenericModal>
  );
}
