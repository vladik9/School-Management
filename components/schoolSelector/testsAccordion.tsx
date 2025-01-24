import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StudentData, TestData } from "@/types/types";
import translations from "@/lib/translations";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RemoveDialog from "../generic/remove-dialog";
import { paginationConstants } from '@/utils/dataEnums';
import PaginationButtons from '../ui/pagination-buttons';

interface TestsAccordionProps {
  tests: TestData[];
  students: StudentData[];
  handleRemoveTest: (testID: number) => void;
  handleAddViewIntervals: (testId: number) => void;
  className: string;
}

const TESTS_PER_PAGE = paginationConstants.TESTS_PER_PAGE;

/**
 * Renders an accordion component for managing and displaying tests.
 *
 * This component provides a paginated view of tests, allowing users to
 * navigate through different pages of tests. It organizes the data
 * into an accordion format, separating tests by class and displaying
 * detailed test information for each test. It also includes buttons
 * for adding or removing view intervals and removing tests from a class.
 *
 * Props:
 * - tests (TestData[]): An array of test data to display.
 * - students (StudentData[]): An array of student data to display.
 * - handleRemoveTest (function): Function to remove a test by its ID.
 * - handleAddViewIntervals (function): Function to add view intervals for a test.
 * - className (string): The name of the class to which the students belong.
 *
 * Returns:
 * - A JSX element representing the test accordion with pagination controls.
 */
export default function TestAccordion({
  tests,
  students,
  handleRemoveTest,
  handleAddViewIntervals,
  className,
}: TestsAccordionProps) {
  const [currentStudentPage, setCurrentStudentPage] = useState(0);

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
  * Paginates the given list of tests.
  *
  * This function takes a list of tests and returns a slice of it, based on the current page number.
  * The number of items per page is determined by the TESTS_PER_PAGE constant.
  *
  * @param {TestData[]} studentList - The list of tests to paginate.
  * @returns {TestData[]} - The paginated list of tests.
  */
  const paginatedStudents = (studentList: TestData[]) => {
    const startIndex = currentStudentPage * TESTS_PER_PAGE;
    return studentList.slice(startIndex, startIndex + TESTS_PER_PAGE);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {
        tests.length === 0 ? (
          <>
            <hr />
            <div style={{ marginTop: '20px', textAlign: 'center', padding: '20px' }}>
              {translations.noTestAdded}
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
                        {translations.testsList} - {className}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table style={{ marginTop: '20px' }}>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{translations.count}</TableHead>
                          <TableHead>{translations.name}</TableHead>
                          <TableHead>{translations.barem}</TableHead>
                          <TableHead>{translations.viewOrEdit}</TableHead>
                          <TableHead>{translations.removeTest}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedStudents(tests).map((test, index) => (
                          <TableRow key={test.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{test.name}</TableCell>
                            <TableCell>{test.barem}</TableCell>
                            <TableCell className="flex justify-center space-x-2">
                              {/* View/Edit Dialog */}
                              <Button
                                variant="outline"
                                className="max-w-100"
                                disabled={students.length === 0}
                                onClick={() => handleAddViewIntervals(test.id)}
                              >
                                {translations.viewAddIntervals}
                              </Button>
                            </TableCell>
                            <TableCell>
                              {/* Student-level Remove Dialog */}
                              <RemoveDialog
                                title={translations.removeTest}
                                description={translations.confirmRemoveTest}
                                confirmText={translations.removeTest}
                                cancelText={translations.cancel}
                                onRemove={() => handleRemoveTest(test.id)}
                                id={test.id}
                                removeMessage={translations.removeTest}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <PaginationButtons itemSize={tests.length} itemsPerPage={TESTS_PER_PAGE} currentPage={currentStudentPage} handlePreviousPage={handlePreviousStudentPage} handleNextPage={handleNextStudentPage} />
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
