import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import translations from "@/lib/translations";
import { ClassData } from "@/types/types";

interface ClassAccordionProps {
  classes: ClassData[];
  translations: any;
  handleAddStudent: (classId: number) => void;
  handleSelectingTest: (classId: number) => void;
  handleAddViewIntervals: (testId: number) => void;
}

export default function ClassAccordion({
  classes,
  translations,
  handleAddStudent,
  handleSelectingTest,
  handleAddViewIntervals
}: ClassAccordionProps) {
  return (
    <div style={{ marginTop: '20px' }}>
      <Accordion type="single" collapsible>
        {classes.map((the_class) => (
          <AccordionItem key={the_class.id} value={the_class.id.toString()}>
            <AccordionTrigger>
              {the_class.name} - {the_class.teacher}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {the_class.tests.length > 0 ? (
                  the_class.tests.map((testItem) => (
                    <Card key={testItem.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{testItem.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div style={{ marginTop: '10px', textAlign: 'center' }}>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => handleAddViewIntervals(testItem.id)}
                          >
                            {translations.viewAddIntervals}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center">
                    <p>{translations.noTestAdded}</p>
                  </div>
                )}
              </div>
              <div style={{ marginTop: '10px', textAlign: 'right' }}>
                <Button variant="outline" style={{ marginRight: '10px' }} onClick={() => handleAddStudent(the_class.id)}>
                  {translations.addStudent}
                </Button>
                <Button variant="outline" onClick={() => handleSelectingTest(the_class.id)}>
                  {translations.addTest}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
