import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import translations from "@/lib/translations";
import { ClassData, DocumentData, StudentData, TestData } from "@/types/types";
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

const TESTS_PER_PAGE = 3;
const STUDENTS_PER_PAGE = 5;
const PERFORMANCES_PER_PAGE = 3;

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
  const [currentTestPage, setCurrentTestPage] = useState(0);
  const [currentStudentPage, setCurrentStudentPage] = useState(0);
  const [currentPerformancePage, setCurrentPerformancePage] = useState(0);

  const handleNextTestPage = () => {
    setCurrentTestPage((prevPage) => prevPage + 1);
  };

  const handlePreviousTestPage = () => {
    setCurrentTestPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextStudentPage = () => {
    setCurrentStudentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousStudentPage = () => {
    setCurrentStudentPage((prevPage) => Math.max(prevPage - 1, 0));
  };


  const handleNextPerformancePage = () => {
    setCurrentPerformancePage((prevPage) => prevPage + 1);
  };

  const handlePreviousPerformancePage = () => {
    setCurrentPerformancePage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const paginatedTests = (tests: TestData[]) => {
    const startIndex = currentTestPage * TESTS_PER_PAGE;
    return tests.slice(startIndex, startIndex + TESTS_PER_PAGE);
  };

  const paginatedStudents = (students: StudentData[]) => {
    const startIndex = currentStudentPage * STUDENTS_PER_PAGE;
    return students.slice(startIndex, startIndex + STUDENTS_PER_PAGE);
  };
  const paginatedPerformances = (performances: any[]) => {
    const startIndex = currentPerformancePage * PERFORMANCES_PER_PAGE;
    return performances.slice(startIndex, startIndex + PERFORMANCES_PER_PAGE);
  };

  return (
    <Card style={{ padding: '40px', borderRadius: '10px', marginTop: '20px' }}>
      {classes.length === 0 ? (
        <div className="text-center">
          <p>{translations.noClassesAdded}</p>
        </div>
      ) : (
        <Accordion type="single" collapsible onValueChange={(value) => setSelectedClassId(parseInt(value))}>
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
                <Card>
                  <div className="space-y-4 p-3">
                    {school_class.tests.length > 0 ? (
                      <>
                        {paginatedTests(school_class.tests).map((testItem) => (
                          <Card className="space-y-2 space-x-2 " key={testItem.id}>
                            <CardHeader>
                              <CardTitle className="text-lg">{testItem.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                <Button
                                  variant="outline"
                                  className="max-w-100"
                                  disabled={school_class.students.length === 0}
                                  onClick={() => handleAddViewIntervals(testItem.id)}
                                >
                                  {translations.viewAddIntervals}
                                </Button>
                                {/* //NOTE -Test-level Remove Button and Dialog  */}
                                <RemoveDialog title={translations.removeTest} description={translations.confirmRemoveTest} confirmText={translations.removeTest} cancelText={translations.cancel} onRemove={() => handleRemoveTest(testItem.id)} id={testItem.id} removeMessage={translations.removeTest} />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        <div className="flex justify-between items-center mt-4">
                          <Button variant="outline" onClick={handlePreviousTestPage} disabled={currentTestPage === 0}>
                            {translations.previous}
                          </Button>
                          <span>
                            {translations.page} {currentTestPage + 1} {translations.of} {Math.ceil(school_class.tests.length / TESTS_PER_PAGE)}
                          </span>
                          <Button variant="outline" onClick={handleNextTestPage} disabled={(currentTestPage + 1) * TESTS_PER_PAGE >= school_class.tests.length}>
                            {translations.next}
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <p>{translations.noTestAdded}</p>
                      </div>
                    )}
                  </div>
                </Card>
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
                    <RemoveDialog title={translations.removeClass} description={translations.confirmRemoveClass} confirmText={translations.removeSchool} cancelText={translations.cancel} onRemove={() => handleRemoveClass(school_class.id)} id={school_class.id} removeMessage={translations.removeClass} />
                  </div>
                </div>

                {school_class.students.length === 0 ? (
                  <div style={{ marginTop: '20px', textAlign: 'center', padding: '20px' }}>{translations.noStudentsAdded}</div>
                ) : (
                  <>
                    <Card style={{ margin: '30px 0', padding: '20px' }}>
                      <div style={{ marginBottom: '10px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>{translations.studentTableList} - {school_class.name}</div>
                      <Table style={{ marginTop: '20px' }}>
                        <TableHeader>
                          <TableRow>
                            <TableHead>{translations.studentId}</TableHead>
                            <TableHead>{translations.name}</TableHead>
                            <TableHead>{translations.viewOrEdit}</TableHead>
                            <TableHead>{translations.removeStudent}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginatedStudents(school_class.students).map((student) => (
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
                                <RemoveDialog title={translations.removeStudent} description={translations.confirmRemoveStudent} confirmText={translations.removeStudent} cancelText={translations.cancel} onRemove={() => handleRemoveStudent(student.id)} id={school_class.id}
                                  removeMessage={translations.removeStudent} />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div className="flex justify-between items-center mt-4">
                        <Button variant="outline" onClick={handlePreviousStudentPage} disabled={currentStudentPage === 0}>
                          {translations.previous}
                        </Button>
                        <span>
                          {translations.page} {currentStudentPage + 1} {translations.of} {Math.ceil(school_class.students.length / STUDENTS_PER_PAGE)}
                        </span>
                        <Button variant="outline" onClick={handleNextStudentPage} disabled={(currentStudentPage + 1) * STUDENTS_PER_PAGE >= school_class.students.length}>
                          {translations.next}
                        </Button>
                      </div>
                    </Card>
                  </>
                )}
                <PerformanceAccordion
                  performances={paginatedPerformances(school_class.performances || [])}
                />
                <div className="flex justify-between items-center mt-4">
                  <Button variant="outline" onClick={handlePreviousPerformancePage} disabled={currentPerformancePage === 0}>
                    {translations.previous}
                  </Button>
                  <span>
                    {translations.page} {currentPerformancePage + 1} {translations.of} {Math.ceil((school_class.performances || []).length / PERFORMANCES_PER_PAGE)}
                  </span>
                  <Button variant="outline" onClick={handleNextPerformancePage} disabled={(currentPerformancePage + 1) * PERFORMANCES_PER_PAGE >= (school_class.performances || []).length}>
                    {translations.next}
                  </Button>
                </div>
                <DocumentAccordion
                  documents={school_class.documents || []}
                  handleUploadDocument={handleUploadDocument}
                  handleRemoveDocument={handleRemoveDocument}
                  handleDownloadDocument={handleDownloadDocument}
                  className={school_class.name}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </Card>
  );
}
