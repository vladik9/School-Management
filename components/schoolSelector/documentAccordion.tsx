import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import translations from "@/lib/translations";
import { DocumentData } from "@/types/types";
import { Button } from '../ui/button';
import RemoveDialog from '../generic/remove-dialog';
import { Download, Upload } from 'lucide-react';

interface DocumentAccordionProps {
  documents: DocumentData[];
  handleRemoveDocument: (documentId: number) => void;
  handleDownloadDocument: (documentId: number) => void;
  handleUploadDocument: () => void;
  className?: string;
}

export default function DocumentAccordion({
  documents,
  handleRemoveDocument,
  handleDownloadDocument,
  handleUploadDocument,
  className = 'document name',
}: DocumentAccordionProps) {
  return (
    <div style={{ marginTop: '20px' }}>
      {documents.length === 0 ? (
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
                  {documents.map((document, index: number) => (
                    <TableRow key={document.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{document.name}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => handleDownloadDocument(document.id)}>
                          <Download className="h-4 w-4 mr-2" />
                          {translations.download}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <RemoveDialog
                          title={translations.removeDocument}
                          description={translations.confirmRemoveDocument}
                          confirmText={translations.removeDocument}
                          cancelText={translations.cancel}
                          onRemove={() => handleRemoveDocument(document.id)}
                          id={document.id}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outline" size="sm" onClick={handleUploadDocument}>
                  <Upload className="h-4 w-4 mr-2" />
                  {translations.upload}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
