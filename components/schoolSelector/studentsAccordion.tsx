import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StudentData } from "@/types/types";
import translations from "@/lib/translations";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RemoveDialog from "../generic/remove-dialog";
import ViewEditDialog from "../generic/view-edit-dialog";
import PaginationButtons from '../ui/pagination-buttons';

interface StudentsAccordionProps {
  /** Array of students for this class */
  students: StudentData[];

  /** Function to handle opening the View/Edit modal for a specific student */
  handleViewEditStudents: (studentId: number) => void;

  /** Function to handle the actual "update student" action */
  handleUpdateStudent: (studentId: number, data: object) => void;

  /** Function to remove a student by ID */
  handleRemoveStudent: (studentId: number) => void;

  /** The ID of the class this accordion belongs to (used in remove dialogs) */
  classId: number;

  /** The name of the class to display in the UI */
  className: string;
}

const STUDENTS_PER_PAGE = 5;

export default function StudentsAccordion({
  students,
  handleViewEditStudents,
  handleUpdateStudent,
  handleRemoveStudent,
  classId,
  className,
}: StudentsAccordionProps) {
  const [currentStudentPage, setCurrentStudentPage] = useState(0);

  const handleNextStudentPage = () => {
    setCurrentStudentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousStudentPage = () => {
    setCurrentStudentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const paginatedStudents = (studentList: StudentData[]) => {
    const startIndex = currentStudentPage * STUDENTS_PER_PAGE;
    return studentList.slice(startIndex, startIndex + STUDENTS_PER_PAGE);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {
        students.length === 0 ? (
          <div style={{ marginTop: '20px', textAlign: 'center', padding: '20px' }}>
            {translations.noStudentsAdded}
          </div>
        ) : (
          <>
            <Card style={{ margin: '30px 0', padding: '20px' }}>
              <Accordion type="single" collapsible>
                <AccordionItem value="students">
                  <AccordionTrigger>
                    <div className="flex items-center justify-between w-full">
                      <span>
                        {translations.studentsList} - {className}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
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
                        {paginatedStudents(students).map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>{student.studentId}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell className="flex justify-center space-x-2">
                              {/* View/Edit Dialog */}
                              <ViewEditDialog
                                title={translations.viewEditStudent}
                                description={translations.viewEditStudentDescription}
                                onOpen={() => handleViewEditStudents(student.id)}
                                triggerButtonTitle={translations.viewOrEdit}
                                id={student.id}
                                cancelText={translations.cancel}
                                confirmText={translations.update}
                                onSave={handleUpdateStudent}
                              >
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
                              {/* Student-level Remove Dialog */}
                              <RemoveDialog
                                title={translations.removeStudent}
                                description={translations.confirmRemoveStudent}
                                confirmText={translations.removeStudent}
                                cancelText={translations.cancel}
                                onRemove={() => handleRemoveStudent(student.id)}
                                id={classId}
                                removeMessage={translations.removeStudent}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <PaginationButtons itemSize={students.length} itemsPerPage={STUDENTS_PER_PAGE} currentPage={currentStudentPage} handlePreviousPage={handlePreviousStudentPage} handleNextPage={handleNextStudentPage} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </>
        )
      }
    </div>
  );
}
