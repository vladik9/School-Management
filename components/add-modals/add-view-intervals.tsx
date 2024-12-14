'use client';
import React, { useState } from 'react';
import GenericModal from '@/components/generic/generic-modal';
import translations from '@/lib/translations';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users } from 'lucide-react';
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
}

export default function AddViewIntervals({ intervals, isModalOpen, handleCloseModal, handleSaveModal, newRecord, setNewRecord, records, students, handleSaveNewRecord }: AddViewIntervalsProps) {
  const [isNewRecordModalOpen, setIsNewRecordModalOpen] = useState(false);
  const handleSaveNewInterval = () => {
    handleSaveModal();
  };
  const handleAddNewRecord = () => {
    setIsNewRecordModalOpen(true);
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

        {!intervals ? (
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
                  <TableCell className="w-1/3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4 mr-2" />
                          {translations.view}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[800px]">
                        <DialogHeader>
                          <DialogTitle>{translations.inter} {interval.id}</DialogTitle>
                        </DialogHeader>
                        <Table className="w-full text-center">
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-1/3" >{translations.studentId}</TableHead>
                              <TableHead className="w-1/3">{translations.startTime}</TableHead>
                              <TableHead className="w-1/3">{translations.finalTime}</TableHead>
                              <TableHead className="w-1/3">{translations.average}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {records && records.length > 0 && records.map((int: any) => (
                              <TableRow key={int.id}>
                                <TableCell className="w-1/3">{int.id}</TableCell>
                                <TableCell className="w-1/3">{int.points}</TableCell>
                                <TableCell className="w-1/3">{int.finalTime}</TableCell>
                                <TableCell className="w-1/3">{int.average}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        {records.length === 0 && <p style={{ marginTop: '10px', textAlign: 'center' }}>{translations.noRecords}</p>}
                        <div style={{ marginTop: '10px', textAlign: 'right' }}>
                          <Button variant="outline" onClick={handleAddNewRecord}>{translations.addRecord} <span>+</span>
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>)}
        <div style={{ marginTop: '10px', textAlign: 'right' }}>
          <Button variant="outline" onClick={() => handleSaveNewInterval()}>{translations.addInterval} <span>+</span>
          </Button>
        </div>
      </div >
      <AddNewRecord isModalOpen={isNewRecordModalOpen} handleCloseModal={() => setIsNewRecordModalOpen(false)} handleSaveModal={handleSaveNewRecord} students={students} newRecord={newRecord} setNewRecord={setNewRecord} records={records} />
    </GenericModal >
  );
}
