
import React, { useState } from 'react';
import { FaSearch, FaFilter, FaFileExport, FaFileImport, FaPlus } from 'react-icons/fa';
import styles from './Categories.module.css';

interface Category {
  orderId: string;
  name: string;
  status: 'Published' | 'Draft';
  product: number;
  modified: string;
  published: string;
}

const dummyCategories: Category[] = [
  {
    orderId: '#6548',
    name: 'Royal Dry Fit Leggings',
    status: 'Published',
    product: 4,
    modified: '12th April, 2024',
    published: '12th April, 2024',
  },
  {
    orderId: '#6549',
    name: 'Royal Dry Fit Leggings',
    status: 'Published',
    product: 4,
    modified: '12th April, 2024',
    published: '12th April, 2024',
  },
  {
    orderId: '#6550',
    name: 'Royal Dry Fit Leggings',
    status: 'Published',
    product: 4,
    modified: '12th April, 2024',
    published: '12th April, 2024',
  },
  {
    orderId: '#6551',
    name: 'Royal Dry Fit Leggings',
    status: 'Published',
    product: 4,
    modified: '12th April, 2024',
    published: '12th April, 2024',
  },
];

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(dummyCategories);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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
      <table className={styles.categoriesTable}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Product</th>
            <th>Modified</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{category.orderId}</td>
              <td>{category.name}</td>
              <td>
                <span className={`${styles.status} ${styles[category.status.toLowerCase()]}`}>
                  {category.status}
                </span>
              </td>
              <td>{category.product}</td>
              <td>{category.modified}</td>
              <td>{category.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;