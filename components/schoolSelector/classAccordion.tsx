import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import translations from "@/lib/translations";
import { ClassData } from "@/types/types";
import RemoveDialog from '../generic/remove-dialog';
import ViewEditDialog from '../generic/view-edit-dialog';
import PerformanceAccordion from './performanceAccordion';
import DocumentAccordion from './documentAccordion';

interface ClassAccordionProps {
  classes: ClassData[];
  handleAddStudent: (classId: number) => void;
  handleUpdateStudent: (studentId: number, data: object) => void;
  handleSelectingTest: (classId: number) => void;
  handleAddViewIntervals: (testId: number) => void;
  handleViewEditStudents: (classId: number) => void;
  setSelectedClassId: (classId: number) => void;
  handleRemoveStudent: (studentId: number) => void;
  handleRemoveClass: (classId: number) => void;
  handleRemoveTest: (testId: number) => void;

  // NOTE - Document-related props
  handleUploadDocument: () => void;
  handleRemoveDocument: (documentId: number) => void;
  handleDownloadDocument: (documentId: number) => void;


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
  handleRemoveClass,
  handleRemoveTest,
  handleUploadDocument,
  handleRemoveDocument,
  handleDownloadDocument,

}: ClassAccordionProps) {
  return (
    <div style={{ padding: '40px', borderRadius: '10px', marginTop: '20px', border: '0.5px solid lightgray' }}>
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
                          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                              variant="outline"
                              className="max-w-100"
                              onClick={() => handleAddViewIntervals(testItem.id)}
                            >
                              {translations.viewAddIntervals}
                            </Button>
                            {/* //NOTE -Test-level Remove Button and Dialog  */}
                            <RemoveDialog title={translations.removeTest} description={translations.confirmRemoveTest} confirmText={translations.removeTest} cancelText={translations.cancel} onRemove={() => handleRemoveTest(testItem.id)} id={testItem.id} />
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
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <Button variant="outline" style={{ marginRight: '10px' }} onClick={() => handleAddStudent(school_class.id)}>
                      {translations.addStudent}
                    </Button>
                    <Button variant="outline" onClick={() => handleSelectingTest(school_class.id)}>
                      {translations.addTest}
                    </Button>
                  </div>
                  {/* //NOTE -Class-level Remove Button and Dialog  */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <RemoveDialog title={translations.removeClass} description={translations.confirmRemoveClass} confirmText={translations.removeSchool} cancelText={translations.cancel} onRemove={() => handleRemoveClass(school_class.id)} id={school_class.id} />
                  </div>
                </div>

                {school_class.students.length === 0 ? (
                  <div style={{ marginTop: '20px', textAlign: 'center' }}>{translations.noStudentsAdded}</div>
                ) : (
                  <div style={{ marginTop: '30px' }}>
                    <div style={{ marginBottom: '10px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>{translations.studentTableList} - {school_class.name}</div>
                    <Table style={{ marginTop: '20px' }}>
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
                              <RemoveDialog title={translations.removeStudent} description={translations.confirmRemoveStudent} confirmText={translations.removeStudent} cancelText={translations.cancel} onRemove={() => handleRemoveStudent(student.id)} id={school_class.id} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
                <PerformanceAccordion
                  performances={school_class.performances || []} />
                <DocumentAccordion
                  documents={school_class.documents || []}
                  handleUploadDocument={handleUploadDocument}
                  handleRemoveDocument={handleRemoveDocument}
                  handleDownloadDocument={handleDownloadDocument}
                  className={school_class.name} />
              </AccordionContent>
            </AccordionItem>
          ))}

        </Accordion>)}
    </div>
  );
}
