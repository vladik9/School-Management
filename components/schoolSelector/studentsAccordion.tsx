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

/**
 * Renders an accordion component for managing and displaying students.
 *
 * This component provides a paginated view of students, allowing users to
 * navigate through different pages of student data. It organizes the data
 * into an accordion format, separating students by class and displaying
 * detailed student information for each student. It also includes buttons
 * for adding and removing students from a class.
 *
 * Props:
 * - students (StudentData[]): An array of student data to display.
 * - handleUpdateStudent (function): Function to update student information.
 * - handleRemoveStudent (function): Function to remove a student from a class.
 * - classId (number): The ID of the class to which the students belong.
 * - className (string): The name of the class to which the students belong.
 * - newRecord (StudentData): The current state of the student details being entered.
 * - setNewRecord (function): Function to update the student details state.
 *
 * Returns:
 * - A JSX element representing the student accordion with pagination controls.
 */
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
  /**
   * Increments the current page number for student pagination.
   *
   * Updates the local state by incrementing the current page number by one.
   * This is used to navigate to the next page of students.
   */
  const handleNextStudentPage = () => {
    setCurrentStudentPage((prevPage) => prevPage + 1);
  };


  /**
   * Decrements the current page number for student pagination.
   *
   * Updates the local state by decrementing the current page number by one,
   * but not below 0 (i.e., the first page). This is used to navigate to the
   * previous page of students.
   */
  const handlePreviousStudentPage = () => {
    setCurrentStudentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  /**
   * Paginates the given list of students.
   *
   * This function takes a list of students and returns a slice of it, based on the current page number.
   * The number of items per page is determined by the STUDENTS_PER_PAGE constant.
   *
   * @param {StudentData[]} studentList - The list of students to paginate.
   * @returns {StudentData[]} - The paginated list of students.
   */
  const paginatedStudents = (studentList: StudentData[]) => {
    const startIndex = currentStudentPage * STUDENTS_PER_PAGE;
    return studentList.slice(startIndex, startIndex + STUDENTS_PER_PAGE);
  };

  /**
   * Handles updating a student.
   *
   * This function updates the student by calling
   * `handleUpdateStudentGlobal` and then closes the student modal.
   *
   * @param {number} studentId - The ID of the student to be updated.
   * @param {object} data - The data to be used for updating the student.
   */
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
