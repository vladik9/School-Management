import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import translations from "@/lib/translations";
import { ClassData } from "@/types/types";
import RemoveDialog from '../generic/remove-dialog';
import ViewEditDialog from '../generic/view-edit-dialog';

interface ClassAccordionProps {
  classes: ClassData[];
  handleAddStudent: (classId: number) => void;
  handleUpdateStudent: (studentId: number, data: object) => void;
  handleSelectingTest: (classId: number) => void;
  handleAddViewIntervals: (testId: number) => void;
  handleViewEditStudents: (classId: number) => void;
  setSelectedClassId: (classId: number) => void;
  handleRemoveStudent: (studentId: number) => void;
  handleRemoveClass: (classId: number) => void; // Add this if you want to remove a class
}

export default function ClassAccordion({
  classes,
  handleAddStudent,
  handleSelectingTest,
  handleAddViewIntervals,
  handleUpdateStudent,
  handleViewEditStudents,
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
                  {/* //NOTE -Class-level Remove Button and Dialog  */}
                  <RemoveDialog title={translations.confirmRemoveRecordTitle} description={translations.confirmRemoveRecordMessage} confirmText={translations.remove} cancelText={translations.cancel} onRemove={() => handleRemoveClass(school_class.id)} id={school_class.id} />
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
                            {/* //TODO - fix this remove button */}
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => handleAddViewIntervals(testItem.id)}
                            >
                              {translations.deleteATest}
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
                          <TableHead>{translations.viewOrEdit}</TableHead>
                          <TableHead>{translations.remove}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {school_class.students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>{student.studentId}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell className="flex justify-center space-x-2">
                              {/* //NOTE - View/Edit Dialog */}
                              <ViewEditDialog
                                title={translations.viewEditStudent} description={translations.viewEditStudentDescription} onOpen={() => handleViewEditStudents(student.id)}
                                triggerButtonTitle={translations.viewOrEdit}
                                id={student.id}
                                cancelText={translations.cancel}
                                confirmText={translations.update}
                                onSave={handleUpdateStudent}
                              >
                                {/* TODO- fix this to be a table to update students */}
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>{translations.studentId}</TableHead>
                                      <TableHead>{translations.name}</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableRow key={student.id}>
                                    <TableCell>{student.studentId}</TableCell>
                                    <TableCell>{student.name}</TableCell>
                                  </TableRow>
                                </Table>
                              </ViewEditDialog>
                            </TableCell>
                            <TableCell>
                              {/* //NOTE - Student-level Remove Dialog */}
                              <RemoveDialog title={translations.confirmRemoveRecordTitle} description={translations.confirmRemoveRecordMessage} confirmText={translations.remove} cancelText={translations.cancel} onRemove={() => handleRemoveStudent(student.id)} id={school_class.id} />
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
