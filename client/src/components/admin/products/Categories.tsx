import React from 'react';
import { FaSearch, FaFilter, FaFileExport, FaFileImport, FaPlus } from 'react-icons/fa';
import styles from './Categories.module.css';
import { useCategoryList } from '@/utils/hooks/useCategoryList';

const Categories: React.FC = () => {
  const {
    categories,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useCategoryList(10);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>
        <button className={styles.actionButton}><FaFilter /> Filter</button>
        <button className={styles.actionButton}><FaFileExport /> Export</button>
        <button className={styles.actionButton}><FaFileImport /> Import</button>
        <button className={styles.newCategoryButton}><FaPlus /> New Category</button>
      </div>
      <table className={styles.categoriesTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Products</th>
            <th>Modified</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category._id}</td>
              <td>{category.name}</td>
              <td>
                <span className={`${styles.status} ${styles[category.status.toLowerCase()]}`}>
                  {category.status}
                </span>
              </td>
              <td>{category.products.length}</td>
              <td>{category.updatedAt}</td>
              <td>{category.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Categories;