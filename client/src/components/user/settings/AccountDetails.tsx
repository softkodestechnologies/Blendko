"use client";
import React, { useState, useRef } from 'react';
import styles from './Settings.module.css';

const AccountDetails: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "femijude10@gmail.com",
    password: "************",
    phone: "0913593945",
  });
  const [isReadOnly, setIsReadOnly] = useState({
    email: true,
    password: true,
    phone: true,
  });

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const toggleReadOnly = (field: keyof typeof isReadOnly, ref: React.RefObject<HTMLInputElement>) => {
    setIsReadOnly({ ...isReadOnly, [field]: !isReadOnly[field] });
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div className={styles.accountDetails}>
      <h2>Account Details</h2>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              id="email"
              value={formData.email}
              readOnly={isReadOnly.email}
              onChange={handleChange}
              ref={emailRef}
            />
            <button
              type="button"
              className={styles.editButton}
              onClick={() => toggleReadOnly('email', emailRef)}
            >
              Edit
            </button>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              id="password"
              value={formData.password}
              readOnly={isReadOnly.password}
              onChange={handleChange}
              ref={passwordRef}
            />
            <button
              type="button"
              className={styles.editButton}
              onClick={() => toggleReadOnly('password', passwordRef)}
            >
              Edit
            </button>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone Number</label>
          <div className={styles.inputWrapper}>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              readOnly={isReadOnly.phone}
              onChange={handleChange}
              ref={phoneRef}
            />
            <button
              type="button"
              className={styles.editButton}
              onClick={() => toggleReadOnly('phone', phoneRef)}
            >
              Edit
            </button>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="dob">Date of Birth*</label>
          <input type="date" id="dob" value="2024-11-12" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="country">Country/Region*</label>
          <select id="country">
            <option value="United Kingdom">United Kingdom</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="province">Province</label>
          <input type="text" id="province" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="town">Town/City*</label>
          <input type="text" id="town" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="postcode">Postcode*</label>
          <input type="text" id="postcode" />
        </div>
        <div className={styles.deleteAccount}>
          <hr />
          <div className="flex space-between align-y gap-10 pt-10 pb-10">
            <p>Delete Account</p>
            <button type="button" className={styles.deleteButton}>Delete</button>
          </div>
          <hr />
        </div>
        <div className={styles.saveButtonParent}>
          <button type="submit" className={styles.saveButton}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;

