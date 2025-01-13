import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StudentData } from "@/types/types";
import translations from "@/lib/translations";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RemoveDialog from "../generic/remove-dialog";
import PaginationButtons from '../ui/pagination-buttons';
import { Users } from 'lucide-react';
import AddViewStudent from '../add-modals/add-view-student';

interface StudentsAccordionProps {
  students: StudentData[];
  handleUpdateStudent: (studentId: number, data: object) => void;
  handleRemoveStudent: (studentId: number) => void;
  classId: number;
  className: string;
  newRecord: StudentData;
  setNewRecord: (data: StudentData) => void;
}

const STUDENTS_PER_PAGE = 5;

export default function StudentsAccordion({
  students,
  handleUpdateStudent: handleUpdateStudentGlobal,
  handleRemoveStudent,
  classId,
  className,
  newRecord,
  setNewRecord,
}: StudentsAccordionProps) {

  const [currentStudentPage, setCurrentStudentPage] = useState(0);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
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
  const handleUpdateStudent = (studentId: number, data: object) => {
    handleUpdateStudentGlobal(studentId, data);
    setIsStudentModalOpen(false);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {
        students.length === 0 ? (
          <>
            <hr />
            <div style={{ marginTop: '20px', textAlign: 'center', padding: '20px' }}>
              {translations.noStudentsAdded}
            </div>
          </>
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
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setIsStudentModalOpen(true);
                                  setNewRecord(student);
                                }}
                              >
                                <Users className="h-4 w-4 mr-2" />
                                {translations.edit}
                              </Button>
                              <AddViewStudent
                                modalTitle={translations.viewEditStudent}
                                modalDescription={translations.viewEditStudentDescription}
                                isModalOpen={isStudentModalOpen}
                                handleCloseModal={() => setIsStudentModalOpen(false)} handleSaveModal={handleUpdateStudent}
                                newRecord={newRecord}
                                setNewRecord={setNewRecord}
                              >
                              </AddViewStudent>
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
