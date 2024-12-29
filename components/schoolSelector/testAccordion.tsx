import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import translations from "@/lib/translations";
import { TestData } from "@/types/types";
import { Button } from '../ui/button';
import RemoveDialog from '../generic/remove-dialog';
import { Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface TestAccordionProps {
  tests: TestData[];
  handleRemoveTest: (documentId: number) => void;

  handleUploadDocument: () => void;
  className?: string;
}

const TESTS_PER_PAGE = 3;

export default function TestAccordion({
  tests,
  handleRemoveTest,
  handleDownloadTest,

  className = 'document name',
}: TestAccordionProps) {
  const [currentTestPage, setCurrentTestPage] = useState(0);

  const handleNextTestPage = () => {
    setCurrentTestPage((prevPage) => prevPage + 1);
  };

  const handlePreviousTestPage = () => {
    setCurrentTestPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const paginatedTests = (tests: TestData[]) => {
    const startIndex = currentTestPage * TESTS_PER_PAGE;
    return tests.slice(startIndex, startIndex + TESTS_PER_PAGE);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {tests.length === 0 ? (
        <>
          <div className="text-center">
            <p>{translations.noDocuments}</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleUploadDocument}>
            <Upload className="h-4 w-4 mr-2" />
            {translations.upload}
          </Button>
        </>
      ) : (
        <Card style={{ padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
          <Accordion type="single" collapsible>
            <AccordionItem value="documents">
              <AccordionTrigger>
                <div className="flex items-center justify-between w-full">
                  <span>
                    {translations.documentsList} - {className}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {paginatedTests(tests).map((testItem) => (
                  <Card className="space-y-2 space-x-2" key={testItem.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{testItem.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div
                        style={{
                          marginTop: '10px',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Button
                          variant="outline"
                          className="max-w-100"
                          disabled={tests.length === 0}
                        // onClick={() => handleAddViewIntervals(testItem.id)}
                        >
                          {translations.viewAddIntervals}
                        </Button>

                        {/* Test-level Remove Button & Dialog */}
                        <RemoveDialog
                          title={translations.removeTest}
                          description={translations.confirmRemoveTest}
                          confirmText={translations.removeTest}
                          cancelText={translations.cancel}
                          // onRemove={() => handleRemoveTest(testItem.id)}
                          id={testItem.id}
                          removeMessage={translations.removeTest}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="outline" size="sm" onClick={handleUploadDocument}>
                    <Upload className="h-4 w-4 mr-2" />
                    {translations.upload}
                  </Button>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Button variant="outline" onClick={handlePreviousTestPage} disabled={currentTestPage === 0}>
                    {translations.previous}
                  </Button>
                  <span>
                    {translations.page} {currentTestPage + 1} {translations.of} {Math.ceil(tests.length / TESTS_PER_PAGE)}
                  </span>
                  <Button variant="outline" onClick={handleNextTestPage} disabled={(currentTestPage + 1) * TESTS_PER_PAGE >= tests.length}>
                    {translations.next}
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      )}
    </div>
  );
}
