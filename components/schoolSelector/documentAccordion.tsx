import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import translations from "@/lib/translations";
import { DocumentData } from "@/types/types";
import { Button } from '../ui/button';
import RemoveDialog from '../generic/remove-dialog';
import { Download, Upload } from 'lucide-react';
import { Card } from '../ui/card';
import { paginationConstants } from '@/utils/dataEnums';
import PaginationButtons from '../ui/pagination-buttons';

interface DocumentAccordionProps {
  documents: DocumentData[];
  handleRemoveDocument: (documentId: number) => void;
  handleDownloadDocument: (documentId: number) => void;
  handleUploadDocument: () => void;
  className?: string;
}

const DOCUMENTS_PER_PAGE = paginationConstants.DOCUMENTS_PER_PAGE;

export default function DocumentAccordion({
  documents,
  handleRemoveDocument,
  handleDownloadDocument,
  handleUploadDocument,
  className = 'document name',
}: DocumentAccordionProps) {
  const [currentDocumentPage, setCurrentDocumentPage] = useState(0);

  const handleNextDocumentPage = () => {
    setCurrentDocumentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousDocumentPage = () => {
    setCurrentDocumentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const paginatedDocuments = (documents: DocumentData[]) => {
    const startIndex = currentDocumentPage * DOCUMENTS_PER_PAGE;
    return documents.slice(startIndex, startIndex + DOCUMENTS_PER_PAGE);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {documents.length === 0 ? (
        <>
          <hr />
          <div style={{ marginTop: '20px', textAlign: 'center', padding: '20px' }}>
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
                <Table style={{ marginTop: '10px' }}>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{translations.count}</TableHead>
                      <TableHead>{translations.docName}</TableHead>
                      <TableHead>{translations.download}</TableHead>
                      <TableHead>{translations.removeDocument}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedDocuments(documents).map((document, index: number) => (
                      <TableRow key={document.id}>
                        <TableCell>{index + 1 + currentDocumentPage * DOCUMENTS_PER_PAGE}</TableCell>
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
                            removeMessage={translations.removeDocument}
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
                <PaginationButtons itemSize={documents.length} itemsPerPage={DOCUMENTS_PER_PAGE} currentPage={currentDocumentPage} handlePreviousPage={handlePreviousDocumentPage} handleNextPage={handleNextDocumentPage} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      )}
    </div>
  );
}
