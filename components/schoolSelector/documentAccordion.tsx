import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import translations from "@/lib/translations";
import { PerformanceData } from "@/types/types";

interface DocumentAccordionProps {
  documentsList: PerformanceData[];
}

export default function DocumentAccordion({
  documentsList: documentsList = [] as PerformanceData[],

}: DocumentAccordionProps) {
  return (
    <div style={{ marginTop: '20px' }}>
      {documentsList.length === 0 ? (
        <div className="text-center">
          <p>{translations.noDocuments}</p>
        </div>
      ) :
        (<Accordion type="single" collapsible >
          {documentsList.map((document) => (
            <AccordionItem key={document.id} value={document.id.toString()}>
              <AccordionTrigger>
                <div className="flex items-center justify-between w-full">
                  <span>
                    {/* //TODO - here should be the  name for the list */}
                    {translations.documentsList} - {document.testName}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {documentsList.length === 0 ? (
                  <div style={{ marginTop: '20px', textAlign: 'center' }}>{translations.noStudentsAdded}</div>
                ) : (
                  <div>
                    <Table style={{ marginTop: '10px' }}>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{translations.count}</TableHead>
                          <TableHead>{translations.docName}</TableHead>
                          <TableHead>{translations.download}</TableHead>
                          <TableHead>{translations.remove}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {documentsList.map((test, index: number) => (
                          <TableRow key={test.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{test.studentId}</TableCell>
                            <TableCell>{test.studentName}</TableCell>

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
