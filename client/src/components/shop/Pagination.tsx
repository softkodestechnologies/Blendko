import styles from './pagination.module.css';

import Dropdown from '../ui/dropdown/Dropdown';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className={`flex align-y align-x ${styles.pagination}`}>
      <p>Page</p>

      <Dropdown
        value={currentPage.toString()}
        className={`${styles.dropdown}`}
        onSelect={(value: string) => onPageChange(+value)}
        optionsList={Array.from({ length: totalPages }, (_, index) =>
          (index + 1).toString()
        )}
      />

      <p>of {totalPages || 0}</p>
    </div>
  );
};

export default Pagination;
