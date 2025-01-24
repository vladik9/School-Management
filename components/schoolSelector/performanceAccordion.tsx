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
  className: string;
}

const PERFORMANCE_PER_PAGE = paginationConstants.PERFORMANCE_PER_PAGE;

/**
 * Renders an accordion component for managing and displaying performances.
 *
 * This component provides a paginated view of performances, allowing users to
 * navigate through different pages of performance data. It organizes the data
 * into an accordion format, separating performances by test and displaying
 * detailed performance scores for boys and girls.
 *
 * Props:
 * - performances (PerformanceData[]): An array of performance data to display.
 * - className (string): The CSS class name for styling the accordion.
 *
 * Returns:
 * - A JSX element representing the performance accordion with pagination controls.
 */
export default function PerformanceAccordion({
  performances,
  className,
}: PerformanceAccordionProps) {

  const [currentPerformancePage, setCurrentPerformancePage] = useState(0);

  /**
   * Advances to the next page of performances.
   *
   * This function increments the current performance page state, allowing
   * the user to navigate to the next set of performances in the list.
   */
  const handleNextPerformancePage = () => {
    setCurrentPerformancePage((prevPage) => prevPage + 1);
  };

  /**
   * Moves to the previous page of performances.
   *
   * This function decrements the current performance page state, allowing
   * the user to navigate to the previous set of performances in the list.
   * If the current performance page is 0, it does not change the state.
   */
  const handlePreviousPerformancePage = () => {
    setCurrentPerformancePage((prevPage) => Math.max(prevPage - 1, 0));
  };

  /**
   * Paginates the given list of performances.
   *
   * This function takes a list of performances and returns a slice of it, based on the current page number.
   * The number of items per page is determined by the PERFORMANCE_PER_PAGE constant.
   *
   * @param {PerformanceData[]} performanceList - The list of performances to paginate.
   * @returns {PerformanceData[]} - The paginated list of performances.
   */
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
                                <div className="text-center font-bold">{translations.boysPerformanceList}</div>
                                {performance.boys.length > 0 ? (
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>{translations.count}</TableHead>
                                        <TableHead>{translations.studentId}</TableHead>
                                        <TableHead>{translations.score}</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {performance.boys.map((int, index) => (
                                        <TableRow key={int.id}>
                                          <TableCell>{index + 1}</TableCell>
                                          <TableCell>{int.studentGeneratedId}</TableCell>
                                          <TableCell>{int.performanceScore}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                ) : (
                                  <div className="text-center w-full pt-10">{translations.noBoysAdded}</div>
                                )}
                              </div>
                              <div>
                                <div className="text-center font-bold">{translations.girlsPerformanceList}</div>
                                {performance.girls.length > 0 ? (
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>{translations.count}</TableHead>
                                        <TableHead>{translations.studentId}</TableHead>
                                        <TableHead>{translations.score}</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {performance.girls.map((int, index) => (
                                        <TableRow key={int.id}>
                                          <TableCell>{index + 1}</TableCell>
                                          <TableCell>{int.studentGeneratedId}</TableCell>
                                          <TableCell>{int.performanceScore}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                ) : (
                                  <div className="text-center w-full pt-10">{translations.noGirlsAdded}</div>
                                )}
                              </div>
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
