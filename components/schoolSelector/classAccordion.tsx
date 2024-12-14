import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users } from 'lucide-react';

import translations from "@/lib/translations";
import { ClassData } from "@/types/types";

interface ClassAccordionProps {
  classes: ClassData[];
  handleAddStudent: (classId: number) => void;
  handleSelectingTest: (classId: number) => void;
  handleAddViewIntervals: (testId: number) => void;
  setSelectedClassId: (classId: number) => void;
}

export default function ClassAccordion({
  classes,
  handleAddStudent,
  handleSelectingTest,
  handleAddViewIntervals,
  setSelectedClassId
}: ClassAccordionProps) {
  return (
    <div style={{ marginTop: '20px' }}>
      <Accordion type="single" collapsible onValueChange={(value) => setSelectedClassId(parseInt(value))}>
        {classes.map((school_class) => (
          <AccordionItem key={school_class.id} value={school_class.id.toString()} >
            <AccordionTrigger>
              {school_class.name} - {school_class.teacher}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {school_class.tests.length > 0 ? (
                  school_class.tests.map((testItem) => (
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
                <Button variant="outline" style={{ marginRight: '10px' }} onClick={() => handleAddStudent(school_class.id)}>
                  {translations.addStudent}
                </Button>
                <Button variant="outline" onClick={() => handleSelectingTest(school_class.id)}>
                  {translations.addTest}
                </Button>
              </div>
              {/* TODO: Make this dynamic and add edit option for students */}
              <div style={{ marginTop: '20px' }}>
                <Table className="table-fixed w-full border-collapse text-center">
                  <TableHeader>
                    <TableRow>
                      <TableHead >{translations.studentId}</TableHead>
                      <TableHead  >{translations.name}</TableHead>
                      <TableHead  >{translations.action}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {school_class.students.length > 0 &&
                      school_class.students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.studentId}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Users className="h-4 w-4 mr-2" />
                                  {translations.viewOrEdit}
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[800px]">
                                <DialogHeader>
                                  <DialogTitle>{student.id}</DialogTitle>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
