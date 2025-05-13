import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import translations from "@/lib/translations";
import { ClassData } from "@/types/types";
import RemoveDialog from "../generic/remove-dialog";
import PerformanceAccordion from "./performanceAccordion";
import DocumentAccordion from "./documentAccordion";

/** Import the new StudentsAccordion component */
import StudentsAccordion from "./studentsAccordion";
import TestAccordion from './testsAccordion';

interface ClassAccordionProps {
  classes: ClassData[];
  handleAddStudent: (classId: number) => void;
  handleUpdateStudent: (studentId: number, data: object) => void;
  handleSelectingTest: (classId: number) => void;
  handleAddViewIntervals: (testId: number) => void;
  setSelectedClassId: (classId: number) => void;
  handleRemoveStudent: (studentId: number) => void;
  handleRemoveClass: (classId: number) => void;
  handleRemoveTest: (testId: number) => void;
  handleUpdateDocument: (documentId: number, link: object) => void;

  /** Document-related props */
  handleUploadDocument: () => void;
  handleRemoveDocument: (documentId: number) => void;
  handleDownloadDocument: (documentId: number) => void;
  newRecord: any;
  setNewRecord: (data: any) => void;
}

/**
 * Renders an accordion for managing classes, students, tests, performances, and documents.
 *
 * This component provides a structured view of classes and their associated entities,
 * such as students, tests, performances, and documents. It allows for the addition,
 * updating, and removal of these entities, utilizing nested accordions for organization.
 *
 * Props:
 * - classes (ClassData[]): An array of class data to be displayed in the accordion.
 * - handleAddStudent (function): Function to add a student to a given class.
 * - handleSelectingTest (function): Function to select a test for a given class.
 * - handleAddViewIntervals (function): Function to add view intervals for a test.
 * - handleUpdateStudent (function): Function to update student information.
 * - setSelectedClassId (function): Function to set the currently selected class ID.
 * - handleRemoveStudent (function): Function to remove a student from a class.
 * - handleRemoveClass (function): Function to remove a class from the list.
 * - handleRemoveTest (function): Function to remove a test from a class.
 * - handleUploadDocument (function): Function to upload a document for a class.
 * - handleRemoveDocument (function): Function to remove a document from a class.
 * - handleDownloadDocument (function): Function to download a document from a class.
 * - newRecord (any): The current state of the student details being entered.
 * - setNewRecord (function): Function to update the student details state.
 *
 * Returns:
 * - A JSX element representing the class accordion with nested components for students,
 *   tests, performances, and documents.
 */
export default function ClassAccordion({
  classes,
  handleAddStudent,
  handleSelectingTest,
  handleAddViewIntervals,
  handleUpdateStudent,
  setSelectedClassId,
  handleRemoveStudent,
  handleRemoveClass,
  handleRemoveTest,
  handleUploadDocument,
  handleRemoveDocument,
  handleDownloadDocument,
  handleUpdateDocument,
  newRecord,
  setNewRecord
}: ClassAccordionProps) {
  return (
    <Card style={{ padding: '40px', borderRadius: '10px', marginTop: '20px' }}>
      {classes.length === 0 ? (
        <div className="text-center">
          <p>{translations.noClassesAdded}</p>
        </div>
      ) : (
        <Accordion
          type="single"
          collapsible
          onValueChange={(value) => setSelectedClassId(parseInt(value))}
        >
          {classes.map((school_class) => (
            <AccordionItem key={school_class.id} value={school_class.id.toString()}>
              <AccordionTrigger>
                <div className="flex items-center justify-between w-full">
                  <span>
                    {school_class.name} - {school_class.teacher}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <TestAccordion
                  tests={school_class.tests}
                  students={school_class.students}
                  handleAddViewIntervals={handleAddViewIntervals}
                  handleRemoveTest={handleRemoveTest}
                  className={school_class.name}
                />
                {/* -- Students Accordion (Extracted into its own component) -- */}
                <StudentsAccordion
                  students={school_class.students}
                  handleUpdateStudent={handleUpdateStudent}
                  handleRemoveStudent={handleRemoveStudent}
                  classId={school_class.id}
                  className={school_class.name}
                  newRecord={newRecord}
                  setNewRecord={setNewRecord}
                />
                {/* -- Performances -- */}
                <PerformanceAccordion
                  performances={school_class.performances}
                  className={school_class.name}
                />
                {/* -- Documents -- */}
                <DocumentAccordion
                  documents={school_class.documents || []}
                  handleUploadDocument={handleUploadDocument}
                  handleRemoveDocument={handleRemoveDocument}
                  handleDownloadDocument={handleDownloadDocument}
                  className={school_class.name}
                  handleUpdateDocument={handleUpdateDocument}
                />
                {/* Buttons for adding a student or test */}
                <div className="mt-4">
                  <hr />
                </div>
                <div
                  style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    <Button
                      variant="outline"
                      style={{ marginRight: '10px' }}
                      onClick={() => handleAddStudent(school_class.id)}
                    >
                      {translations.addStudent}
                    </Button>
                    <Button variant="outline" onClick={() => handleSelectingTest(school_class.id)}>
                      {translations.addTest}
                    </Button>
                  </div>
                  {/* Class-level Remove Button & Dialog */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <RemoveDialog
                      title={translations.removeClass}
                      description={translations.confirmRemoveClass}
                      confirmText={translations.removeSchool}
                      cancelText={translations.cancel}
                      onRemove={() => handleRemoveClass(school_class.id)}
                      id={school_class.id}
                      removeMessage={translations.removeClass}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </Card>
  );
}
