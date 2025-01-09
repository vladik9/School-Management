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

export default function TestAccordion({
  tests,
  students,
  handleRemoveTest,
  handleAddViewIntervals,
  className,
}: TestsAccordionProps) {
  const [currentStudentPage, setCurrentStudentPage] = useState(0);

  const handleNextStudentPage = () => {
    setCurrentStudentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousStudentPage = () => {
    setCurrentStudentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

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
