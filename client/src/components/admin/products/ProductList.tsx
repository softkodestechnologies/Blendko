import React from 'react';
import { FaSearch, FaFilter, FaFileExport, FaFileImport, FaPlus } from 'react-icons/fa';
import styles from './ProductList.module.css';
import { useProductList } from '@/utils/hooks/useProductList';

const ProductList: React.FC = () => {
  const {
    products,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useProductList(10);

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
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>
        <button className={styles.actionButton}><FaFilter /> Filter</button>
        <button className={styles.actionButton}><FaFileExport /> Export</button>
        <button className={styles.actionButton}><FaFileImport /> Import</button>
        <button className={styles.newProductButton}><FaPlus /> New Product</button>
      </div>
      <table className={styles.productsTable}>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Status</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Modified</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.sku}>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>
                <span className={`${styles.status} ${styles[product.status.toLowerCase()]}`}>
                  {product.status}
                </span>
              </td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td>{product.modified}</td>
              <td>{product.published}</td>
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

export default ProductList;