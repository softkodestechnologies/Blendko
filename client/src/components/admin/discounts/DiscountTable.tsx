import React, { useState, useEffect, useCallback } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import styles from '../Admin.module.css';

interface Discount {
  _id: string;
  name: string;
  code: string;
  status: string;
  startsOn: string;
  expiresOn: string;
  type: string;
  value: number;
  usageLimit: number;
}

interface DiscountTableProps {
  discounts: Discount[];
  selectedDiscounts: string[];
  setSelectedDiscounts: React.Dispatch<React.SetStateAction<string[]>>;
  onEdit: (discount: Discount) => void;
  onDelete: (ids: string[]) => void;
  activeTab: 'all' | 'active' | 'expired';
}

const DiscountTable: React.FC<DiscountTableProps> = ({
  discounts,
  selectedDiscounts,
  setSelectedDiscounts,
  onEdit,
  onDelete,
  activeTab,
}) => {
  const [filteredDiscounts, setFilteredDiscounts] = useState(discounts);

  useEffect(() => {
    switch (activeTab) {
      case 'active':
        setFilteredDiscounts(discounts.filter(d => d.status === 'active'));
        break;
      case 'expired':
        setFilteredDiscounts(discounts.filter(d => d.status === 'expired'));
        break;
      default:
        setFilteredDiscounts(discounts);
    }
  }, [activeTab, discounts]);

  const toggleRowSelected = useCallback((id: string) => {
    setSelectedDiscounts(prev => {
      const isSelected = prev.includes(id);
      if (isSelected) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  }, [setSelectedDiscounts]);

  const handleDelete = useCallback(() => {
    if (selectedDiscounts.length > 0) {
      onDelete(selectedDiscounts);
    }
  }, [selectedDiscounts, onDelete]);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableActions}>
        <button
          onClick={() => {
            const selectedDiscount = discounts.find(d => d._id === selectedDiscounts[0]);
            if (selectedDiscount) {
              onEdit(selectedDiscount);
            }
          }}
          disabled={selectedDiscounts.length !== 1}
          className={styles.editButton}
        >
          <FaPen /> Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={selectedDiscounts.length === 0}
          className={styles.deleteButton}
        >
          <FaTrash /> Delete
        </button>
      </div>
      <table className={styles.discountTable}>
        <thead>
          <tr>
            <th>Select</th>
            <th>Coupon Name</th>
            <th>Code</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>Expiry Date</th>
            <th>Type</th>
            <th>Value</th>
            <th>Usage Limit</th>
          </tr>
        </thead>
        <tbody>
          {filteredDiscounts.map((discount) => (
            <tr key={discount._id}>
              <td>
                <input
                  title="selectedDiscounts"
                  type="checkbox"
                  checked={selectedDiscounts.includes(discount._id)}
                  onChange={() => toggleRowSelected(discount._id)}
                />
              </td>
              <td>{discount.name}</td>
              <td>{discount.code}</td>
              <td>
                <span className={`${styles.status} ${styles[discount.status.toLowerCase()]}`}>
                  {discount.status}
                </span>
              </td>
              <td>{discount.startsOn}</td>
              <td>{discount.expiresOn}</td>
              <td>{discount.type}</td>
              <td>{discount.value}</td>
              <td>{discount.usageLimit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default DiscountTable;