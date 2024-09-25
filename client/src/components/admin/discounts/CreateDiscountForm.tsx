import React, { useState, useEffect } from 'react';
import styles from './DiscountForm.module.css';

interface DiscountFormData {
    _id?: string;
    name: string;
    code: string;
    type: string;
    value: number;
    startsOn: string;
    expiresOn: string;
    usageLimit: number;
    status: string;
}

interface CreateDiscountFormProps {
  onSubmit: (data: DiscountFormData) => void;
  onCancel: () => void;
  initialData?: DiscountFormData;
}

const CreateDiscountForm: React.FC<CreateDiscountFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState<DiscountFormData>({
    name: '',
    code: '',
    type: 'percentage',
    value: 0,
    startsOn: '',
    expiresOn: '',
    usageLimit: 0,
    status: 'active',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.discountForm}>
      <h2>{initialData ? 'Edit Discount' : 'New Discount'}</h2>
      
      <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="code">Coupon Code</label>
        <input
          type="text"
          id="code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
        />
        <button type="button" className={styles.generateCode}>Generate code</button>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="type">Discount type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="percentage">Percentage Discount</option>
          <option value="fixed_amount">Fixed Amount</option>
          <option value="free_shipping">Free Shipping</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="value">Value</label>
        <input
          type="number"
          id="value"
          name="value"
          value={formData.value}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="startsOn">Start Date</label>
        <input
          type="date"
          id="startsOn"
          name="startsOn"
          value={formData.startsOn}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="expiresOn">Expiration Date</label>
        <input
          type="date"
          id="expiresOn"
          name="expiresOn"
          value={formData.expiresOn}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="usageLimit">Usage Limit</label>
        <input
          type="number"
          id="usageLimit"
          name="usageLimit"
          value={formData.usageLimit}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="disabled">Disabled</option>
        </select>
      </div>

      <div className={styles.formActions}>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>Cancel</button>
        <button type="submit" className={styles.saveButton}>Save</button>
      </div>
    </form>
  );
};

export default CreateDiscountForm;