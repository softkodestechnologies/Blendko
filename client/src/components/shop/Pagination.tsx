import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onPageChange(Number(event.target.value));
  };

  return (
    <div className='flex align-x'>
      {totalPages === 0? '':
      <label htmlFor="page-select" className='pagination-label'>Page  
        <select id="page-select" value={currentPage} onChange={handleChange}>
            {Array.from({ length: totalPages }, (_, index) => (
            <option key={index + 1} value={index + 1}>
                {index + 1}
            </option>
            ))}
        </select>
      of {totalPages}</label>
  }
    </div>
  );
};

export default Pagination;

