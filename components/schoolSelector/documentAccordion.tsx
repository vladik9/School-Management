import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import translations from "@/lib/translations";
import { DocumentData } from "@/types/types";
import { Button } from '../ui/button';
import ShareDialog from '../generic/share-dialog';
import { Download, Share, Upload } from 'lucide-react';
import { Card } from '../ui/card';
import { paginationConstants } from '@/utils/dataEnums';
import PaginationButtons from '../ui/pagination-buttons';
import RemoveDialog from '../generic/remove-dialog';

interface DocumentAccordionProps {
  documents: DocumentData[];
  handleRemoveDocument: (documentId: number) => void;
  handleDownloadDocument: (documentId: number) => void;
  handleUploadDocument: () => void;
  className?: string;
}

const DOCUMENTS_PER_PAGE = paginationConstants.DOCUMENTS_PER_PAGE;

/**
 * Renders an accordion component for managing and displaying documents.
 *
 * This component provides a paginated view of documents, allowing users to
 * upload, download, and remove documents. It displays a message when no
 * documents are present and provides buttons for navigating between pages.
 *
 * Props:
 * - documents (DocumentData[]): An array of documents to display.
 * - handleRemoveDocument (function): Function to remove a document by its ID.
 * - handleDownloadDocument (function): Function to download a document by its ID.
 * - handleUploadDocument (function): Function to handle document uploads.
 * - className (string, optional): The CSS class name for styling the accordion.
 *
 * Returns:
 * - A JSX element representing the document accordion with pagination controls.
 */
export default function DocumentAccordion({
  documents,
  handleRemoveDocument,
  handleDownloadDocument,
  handleUploadDocument,
  className = 'document name',
}: DocumentAccordionProps) {
  const [currentDocumentPage, setCurrentDocumentPage] = useState(0);

  /**
   * Increments the current page number for document pagination.
   *
   * Updates the local state by incrementing the current page number by one.
   * This is used to navigate to the next page of documents.
   */
  const handleNextDocumentPage = () => {
    setCurrentDocumentPage((prevPage) => prevPage + 1);
  };

  /**
   * Decrements the current page number for document pagination.
   *
   * Updates the local state by decrementing the current page number by one,
   * but not below 0 (i.e., the first page). This is used to navigate to the
   * previous page of documents.
   */
  const handlePreviousDocumentPage = () => {
    setCurrentDocumentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  /**
   * Paginates the given list of documents.
   *
   * This function takes a list of documents and returns a slice of it, based on the current page number.
   * The number of items per page is determined by the DOCUMENTS_PER_PAGE constant.
   *
   * @param {DocumentData[]} documents - The list of documents to paginate.
   * @returns {DocumentData[]} - The paginated list of documents.
   */
  const paginatedDocuments = (documents: DocumentData[]) => {
    const startIndex = currentDocumentPage * DOCUMENTS_PER_PAGE;
    return documents.slice(startIndex, startIndex + DOCUMENTS_PER_PAGE);
  };
  const handleDocumentShare = (documentId: number) => {
    navigator.clipboard.writeText(`${window.location.origin}/document/${documentId}`);
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
                      <TableHead>{translations.shareDocumentLink}</TableHead>
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
                        <TableCell>
                          {/* <Button variant="outline" size="sm" onClick={() => handleDocumentShare(document.id)}>
                            <Share className="h-4 w-4 mr-2" />
                            {translations.share}
                          </Button> */}
                          <ShareDialog title={translations.share} description={translations.shareDocumentLink} confirmText={translations.share} cancelText={translations.cancel} onShare={() => handleDocumentShare(document.id)} id={document.id} shareMessage={translations.share} />
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
