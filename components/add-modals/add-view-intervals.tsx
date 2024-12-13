'use client';
import React, { useState } from 'react';
import GenericModal from '@/components/generic/generic-modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import translations from '@/lib/translations';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { School, Users } from 'lucide-react';
interface AddViewIntervalsProps {
  intervals: any[];
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSaveModal: () => void;
  newRecord: any;
  setNewRecord: (data: { name: string; }) => void;
}


export default function AddViewIntervals({ intervals, isModalOpen, handleCloseModal, handleSaveModal }: AddViewIntervalsProps) {
  // const [isIntervalModalOpen, setIsIntervalModalOpen] = useState(false);
  const handleSaveNewInterval = () => {
    handleSaveModal();
  };
  return (
    <GenericModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSave={handleSaveModal}
      title={translations.viewAddIntervals}
      description=''
      width='800'
    >
      <div className="space-y-4">
        <>
          {!intervals ? (
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <p>{translations.noIntervals}</p>
            </div>
          ) : (<Table>
            <TableHeader>
              <TableRow>
                <TableHead>{translations.intervalName}</TableHead>
                <TableHead>{translations.action}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {intervals.length > 0 && intervals.map((interval) => (
                <TableRow key={interval.id}>
                  <TableCell>{translations.inter} {interval.id}</TableCell>
                  <TableCell>
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
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>{translations.studentId}</TableHead>
                              <TableHead>{translations.points}</TableHead>
                              <TableHead>{translations.finalTime}</TableHead>
                              <TableHead>{translations.average}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {intervals.length > 0 && interval.map((int: any) => (
                              <TableRow key={int.id}>
                                <TableCell>{int.id}</TableCell>
                                <TableCell>{int.points}</TableCell>
                                <TableCell>{int.finalTime}</TableCell>
                                <TableCell>{int.average}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>)}
        </>
        <div style={{ marginTop: '10px', textAlign: 'right' }}>
          <Button variant="outline" onClick={() => handleSaveNewInterval()}>{translations.addInterval} <span>+</span>
          </Button>
        </div>
      </div >
      {/* <GenericModal isOpen={isIntervalModalOpen}
        onClose={() => setIsIntervalModalOpen(false)}
        onSave={handleSaveModal}
        title={translations.addInterval}
        description=''
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">{translations.className}</Label>
            <Input id="name" placeholder={translations.addNewClass} value={newRecord.name || ''} onChange={(e) =>
              setNewRecord((prev: any) => ({ ...prev, name: e.target.value }))
            } />
            <Label htmlFor="name">{translations.teacherName}</Label>
            <Input id="name" placeholder={translations.teacherName} value={newRecord.teacher || ''} onChange={(e) =>
              setNewRecord((prev: any) => ({ ...prev, teacher: e.target.value }))
            } />
          </div>

        </div>
      </GenericModal> */}
    </GenericModal >
  );
}
