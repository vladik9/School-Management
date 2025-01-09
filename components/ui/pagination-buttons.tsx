import React from 'react';
import { Button } from '../ui/button';
import translations from '@/lib/translations';
interface PaginationButtonsProps {
  itemSize: number;
  itemsPerPage: number;
  currentPage: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}


export default function PaginationButtons({
  itemSize,
  itemsPerPage,
  currentPage,
  handlePreviousPage,
  handleNextPage
}: PaginationButtonsProps) {
  return (
    <div className="flex justify-between items-center mt-4">
      <Button variant="outline" onClick={handlePreviousPage} disabled={currentPage === 0}>
        {translations.previous}
      </Button>
      <span>
        {translations.page} {currentPage + 1} {translations.of} {Math.ceil(itemSize / itemsPerPage) || 1}
      </span>
      <Button variant="outline" onClick={handleNextPage} disabled={(currentPage + 1) * itemsPerPage >= itemSize}>
        {translations.next}
      </Button>
    </div>
  );
}
