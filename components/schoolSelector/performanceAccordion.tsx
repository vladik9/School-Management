import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import translations from "@/lib/translations";
import { PerformanceData } from "@/types/types";

interface PerformanceAccordionProps {
  performancesList: PerformanceData[];
}

export default function PerformanceAccordion({
  performancesList = [] as PerformanceData[],

}: PerformanceAccordionProps) {
  return (
    <div style={{ marginTop: '20px' }}>
      {performancesList.length === 0 ? (
        <div className="text-center">
          <p>{translations.noPerformance}</p>
        </div>
      ) :
        (<Accordion type="single" collapsible >
          {performancesList.map((test) => (
            <AccordionItem key={test.id} value={test.id.toString()}>
              <AccordionTrigger>
                <div className="flex items-center justify-between w-full">
                  <span>
                    {/* //TODO - here should be name for the list */}
                    {translations.studentListOfPerformance} - {test.testName}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {performancesList.length === 0 ? (
                  <div style={{ marginTop: '20px', textAlign: 'center' }}>{translations.noStudentsAdded}</div>
                ) : (
                  <div>
                    <Table style={{ marginTop: '10px' }}>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{translations.count}</TableHead>
                          <TableHead>{translations.studentId}</TableHead>
                          <TableHead>{translations.studentName}</TableHead>
                          <TableHead>{translations.testBarem}</TableHead>
                          <TableHead>{translations.score}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {performancesList.map((test, index: number) => (
                          <TableRow key={test.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{test.studentId}</TableCell>
                            <TableCell>{test.studentName}</TableCell>
                            <TableCell className="flex justify-center space-x-2">
                              scor
                            </TableCell>
                            <TableCell>
                              scor
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>)}
    </div>
  );
}
