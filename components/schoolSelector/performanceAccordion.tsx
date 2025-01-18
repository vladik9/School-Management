import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PerformanceData } from "@/types/types";
import translations from "@/lib/translations";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { paginationConstants } from '@/utils/dataEnums';
import PaginationButtons from '../ui/pagination-buttons';

interface PerformanceAccordionProps {
  performances: PerformanceData[];
  // handleRemoveTest: (testID: number) => void;
  // handleAddViewIntervals: (testId: number) => void;
  className: string;
}

const PERFORMANCE_PER_PAGE = paginationConstants.PERFORMANCE_PER_PAGE;

export default function PerformanceAccordion({
  performances,
  className,
}: PerformanceAccordionProps) {
  console.log("🚀 ~ performances:", performances);

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

  return (
    <div style={{ marginTop: '20px' }}>
      {
        performances.length === 0 ? (
          <>
            <hr />
            <div style={{ marginTop: '20px', textAlign: 'center', padding: '20px' }}>
              {translations.noPerformance}
            </div>
          </>
        ) : (
          <>
            <Card style={{ margin: '30px 0', padding: '20px' }}>
              <Accordion type="single" collapsible>
                <AccordionItem value="performances-accordion">
                  <AccordionTrigger>
                    <div className="flex items-center justify-between w-full">
                      <span>
                        {translations.performancesList} - {className}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Accordion type="single" collapsible>
                      {paginatedPerformances(performances).map((performance) => (
                        <AccordionItem key={performance.testId} value={`test-performance-${performance.testId}`}>
                          <AccordionTrigger>
                            <h3>{performance.testName}</h3>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span>MAN</span>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>{translations.student}</TableHead>
                                      <TableHead>{translations.score}</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  {/* <TableBody>
                              {performance.intervals.map((int) => (
                                <TableRow key={int.id}>
                                  <TableCell>{int.name}</TableCell>
                                  <TableCell>{int.score}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody> */}
                                </Table>
                              </div>
                              <div>
                                <span>FAME</span>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>{translations.student}</TableHead>
                                      <TableHead>{translations.score}</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  {/* <TableBody>
                              {performance.intervals.map((int) => (
                                <TableRow key={int.id}>
                                  <TableCell>{int.name}</TableCell>
                                  <TableCell>{int.score}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody> */}
                                </Table></div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                    <PaginationButtons
                      itemSize={performances.length}
                      itemsPerPage={PERFORMANCE_PER_PAGE}
                      currentPage={currentPerformancePage}
                      handlePreviousPage={handlePreviousPerformancePage} handleNextPage={handleNextPerformancePage}
                    />
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
