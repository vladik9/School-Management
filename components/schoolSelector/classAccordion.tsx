import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Users, Trash2 } from 'lucide-react';
import translations from "@/lib/translations";
import { ClassData } from "@/types/types";

interface ClassAccordionProps {
  classes: ClassData[];
  handleAddStudent: (classId: number) => void;
  handleSelectingTest: (classId: number) => void;
  handleAddViewIntervals: (testId: number) => void;
  setSelectedClassId: (classId: number) => void;
  handleRemoveStudent?: (studentId: number) => void;
  handleRemoveClass?: (classId: number) => void; // Add this if you want to remove a class
}

export default function ClassAccordion({
  classes,
  handleAddStudent,
  handleSelectingTest,
  handleAddViewIntervals,
  setSelectedClassId,
  handleRemoveStudent,
  handleRemoveClass
}: ClassAccordionProps) {
  return (
    <div style={{ marginTop: '20px' }}>
      {classes.length === 0 ? (
        <div className="text-center">
          <p>{translations.noClassesAdded}</p>
        </div>
      ) :
        (<Accordion type="single" collapsible onValueChange={(value) => setSelectedClassId(parseInt(value))}>
          {classes.map((school_class) => (
            <AccordionItem key={school_class.id} value={school_class.id.toString()}>
              <AccordionTrigger>
                <div className="flex items-center justify-between w-full">
                  <span>
                    {school_class.name} - {school_class.teacher}
                  </span>
                  {/* Class-level Remove Button and Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="ml-2">
                        <Trash2 className="h-4 w-4 mr-1" />
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
                          onClick={() => handleRemoveClass && handleRemoveClass(school_class.id)}
                        >
                          {translations.confirm}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {school_class.tests.length > 0 ? (
                    school_class.tests.map((testItem) => (
                      <Card key={testItem.id}>
                        <CardHeader>
                          <CardTitle className="text-lg">{testItem.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div style={{ marginTop: '10px', textAlign: 'center' }}>
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => handleAddViewIntervals(testItem.id)}
                            >
                              {translations.viewAddIntervals}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center">
                      <p>{translations.noTestAdded}</p>
                    </div>
                  )}
                </div>
                <div style={{ marginTop: '10px', textAlign: 'right' }}>
                  <Button variant="outline" style={{ marginRight: '10px' }} onClick={() => handleAddStudent(school_class.id)}>
                    {translations.addStudent}
                  </Button>
                  <Button variant="outline" onClick={() => handleSelectingTest(school_class.id)}>
                    {translations.addTest}
                  </Button>
                </div>
                {school_class.students.length === 0 ? (
                  <div style={{ marginTop: '20px', textAlign: 'center' }}>{translations.noStudentsAdded}</div>
                ) : (
                  <div style={{ marginTop: '20px' }}>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{translations.studentId}</TableHead>
                          <TableHead>{translations.name}</TableHead>
                          <TableHead>{translations.action}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {school_class.students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>{student.studentId}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell className="flex justify-center space-x-2">
                              {/* View/Edit Dialog */}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Users className="h-4 w-4 mr-2" />
                                    {translations.viewOrEdit}
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[800px]">
                                  <DialogHeader>
                                    <DialogTitle>{student.name}</DialogTitle>
                                  </DialogHeader>
                                  {/* Your view/edit form or data here */}
                                </DialogContent>
                              </Dialog>

                              {/* Student-level Remove Dialog */}
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
                                      onClick={() => handleRemoveStudent && handleRemoveStudent(student.id)}
                                    >
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
                  </div>
                )}

              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>)}
    </div>
  );
}
