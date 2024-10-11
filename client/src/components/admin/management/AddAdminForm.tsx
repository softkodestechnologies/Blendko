import React, { useState, useEffect } from 'react';
import { useCreateAdminMutation, useUpdateAdminMutation } from '@/services/userService';
import { CountryDropdown } from 'react-country-region-selector';
import styles from './AddAdminForm.module.css';

interface AddAdminFormProps {
  onClose: () => void;
  adminToEdit?: any | null;
  onAdminAdded: () => void;
}

const AddAdminForm: React.FC<AddAdminFormProps> = ({ onClose, adminToEdit, onAdminAdded }) => {
  const [createAdmin] = useCreateAdminMutation();
  const [updateAdmin] = useUpdateAdminMutation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    houseAddress: '',
    state: '',
    country: '',
    phoneNumber: '',
    role: '',
  });

  useEffect(() => {
    if (adminToEdit) {
      const [firstName, lastName] = adminToEdit.name.split(' ');
      setFormData({
        firstName,
        lastName,
        email: adminToEdit.email,
        password: '', // Don't set the password when editing
        houseAddress: adminToEdit.houseAddress || '',
        state: adminToEdit.state || '',
        country: adminToEdit.country || '',
        phoneNumber: adminToEdit.phoneNumber || '',
        role: adminToEdit.role[0] || '',
      });
    }
  }, [adminToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const adminData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        role: [formData.role],
        houseAddress: formData.houseAddress,
        state: formData.state,
        country: formData.country,
        phoneNumber: formData.phoneNumber,
      };

      if (adminToEdit) {
        await updateAdmin({ id: adminToEdit._id, ...adminData });
      } else {
        await createAdmin(adminData);
      }
      onAdminAdded();
      onClose();
    } catch (error) {
      console.error('Error creating/updating admin:', error);
    }
  };

  return (
    <div className={styles.modal}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formTitle}>
          <span>{adminToEdit ? 'Edit Admin' : 'Add Admin'}</span>
          <button type="button" onClick={onClose} className={styles.closeButton}>&times;</button>
        </div>
        <div className={styles.inputGroup}>
          <input className={`${styles.input} ${styles.inputHalf}`} name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter First Name" required />
          <input className={`${styles.input} ${styles.inputHalf}`} name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter Last Name" required />
        </div>
        <div className={styles.inputGroup}>
          <input className={styles.input} name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter Email Address" required />
        </div>
        {!adminToEdit && (
          <div className={styles.inputGroup}>
            <input className={styles.input} name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" required />
          </div>
        )}
        <div className={styles.inputGroup}>
          <input className={styles.input} name="houseAddress" value={formData.houseAddress} onChange={handleChange} placeholder="Enter House Address" />
        </div>
        <div className={styles.inputGroup}>
          <input className={styles.input} name="state" value={formData.state} onChange={handleChange} placeholder="Select State" />
        </div>
        <div className={styles.inputGroup}>
          <CountryDropdown
            value={formData.country}
            onChange={(val) => setFormData({ ...formData, country: val })}
            classes={styles.select}
          />
        </div>
        <div className={styles.inputGroup}>
          <input className={styles.input} name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter Phone Number" />
        </div>
        <div className={styles.inputGroup}>
          <select className={styles.select} name="role" value={formData.role} onChange={handleChange} required aria-label="role">
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="super-admin">Super Admin</option>
          </select>
        </div>
        <div className={styles.buttonGroup}>
          <button type="button" className={`${styles.button} ${styles.previewButton}`}>Preview</button>
          <button type="submit" className={`${styles.button} ${styles.submitButton}`}>{adminToEdit ? 'Update Admin' : 'Add New Admin'}</button>
        </div>
      </form>
    </div>
  );
};

export default AddAdminForm;