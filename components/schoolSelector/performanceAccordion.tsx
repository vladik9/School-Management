import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PerformanceData, StudentData } from "@/types/types";
import translations from "@/lib/translations";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RemoveDialog from "../generic/remove-dialog";
import { paginationConstants } from '@/utils/dataEnums';
import PaginationButtons from '../ui/pagination-buttons';

interface PerformanceAccordionProps {
  performances: PerformanceData[];
  students: StudentData[];
  // handleRemoveTest: (testID: number) => void;
  // handleAddViewIntervals: (testId: number) => void;
  className: string;
}

const PERFORMANCE_PER_PAGE = paginationConstants.PERFORMANCE_PER_PAGE;

export default function PerformanceAccordion({
  performances,
  students,
  className,
}: PerformanceAccordionProps) {
  const [currentPerformancePage, setCurrentPerformancePage] = useState(0);

  const handleNextPerformancePage = () => {
    setCurrentPerformancePage((prevPage) => prevPage + 1);
  };

  const handlePreviousPerformancePage = () => {
    setCurrentPerformancePage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const paginatedPerformances = (performanceList: PerformanceData[]) => {
    const startIndex = currentPerformancePage * PERFORMANCE_PER_PAGE;
    return performanceList.slice(startIndex, startIndex + PERFORMANCE_PER_PAGE);
  };
  console.log('performances', performances);

  // TODO -- complete this functions and logic
  return (
    <div style={{ marginTop: '20px' }}>
      {
        performances.length === 0 ? (
          <><hr />
            <div style={{ marginTop: '20px', textAlign: 'center', padding: '20px' }}>
              {translations.noPerformance}
            </div>
          </>
        ) : (
          <>
            <Card style={{ margin: '30px 0', padding: '20px' }}>
              <Accordion type="single" collapsible>
                <AccordionItem value="performances">
                  <AccordionTrigger>
                    <div className="flex items-center justify-between w-full">
                      <span>
                        {translations.performancesList} - {className}
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
                        {paginatedPerformances(performances).map((performance, index) => (
                          <TableRow key={performance.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{performance.name}</TableCell>
                            <TableCell>{performance.barem}</TableCell>
                            <TableCell className="flex justify-center space-x-2">
                              {/* View/Edit Dialog */}
                              <Button
                                variant="outline"
                                className="max-w-100"
                                disabled={students.length === 0}
                                onClick={() => handleAddViewIntervals(performance.id)}
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
                                onRemove={() => handleRemoveTest(performance.id)}
                                id={performance.id}
                                removeMessage={translations.removeTest}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <PaginationButtons
                      itemSize={tests.length}
                      itemsPerPage={PERFORMANCE_PER_PAGE}
                      currentPage={currentPerformancePage}
                      handlePreviousPage={handlePreviousPerformancePage}
                      handleNextPage={handleNextPerformancePage}
                    />
                    <div className="flex justify-between items-center mt-4">
                      <Button
                        variant="outline"
                        onClick={handlePreviousPerformancePage}
                        disabled={currentPerformancePage === 0}
                      >
                        {translations.previous}
                      </Button>
                      <span>
                        {translations.page} {currentPerformancePage + 1} {translations.of}{' '}
                        {Math.ceil(tests.length / PERFORMANCE_PER_PAGE)}
                      </span>
                      {translations.addedTest} {tests.length}
                      {/* //TODO - fix this it should look better */}
                      <Button
                        variant="outline"
                        onClick={handleNextPerformancePage}
                        disabled={(currentPerformancePage + 1) * PERFORMANCE_PER_PAGE >= tests.length}
                      >
                        {translations.next}
                      </Button>
                    </div>
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
