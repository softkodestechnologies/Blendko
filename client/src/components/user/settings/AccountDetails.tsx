"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./Settings.module.css";
import Alert from "@/components/ui/alert/Alert";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserDetailsMutation } from "@/services/userService";
import { updateUser } from "@/services/userSlice";
import { RootState } from "@/services/store";
import { BackButtonIcon } from "../../../../public/svg/icon";
import Link from 'next/link';

const AccountDetails: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [updateUserProfile] = useUpdateUserDetailsMutation();

  const [formData, setFormData] = useState({
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
    country: user?.country || 'United Kingdom',
    province: user?.province || '',
    city: user?.city || '',
    postcode: user?.postcode || '',
  });

  const [isReadOnly, setIsReadOnly] = useState({
    email: true,
    phone: true,
    dateOfBirth: true,
    country: true,
    province: true,
    city: true,
    postcode: true,
  });

  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const dateOfBirthRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const provinceRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const postcodeRef = useRef<HTMLInputElement>(null);

  const toggleReadOnly = (field: keyof typeof isReadOnly, ref: React.RefObject<HTMLInputElement | HTMLSelectElement>) => {
    setIsReadOnly({ ...isReadOnly, [field]: !isReadOnly[field] });
    if (ref.current) {
      ref.current.focus();
    }
  };

  const [alert, setAlert] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
    show: false,
    type: 'success',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prevData => {
      const newData = { ...prevData, [id]: value };
      return newData;
    });
  };

  const validateForm = () => {
    const { email, phone, dateOfBirth, country, city, postcode } = formData;
    
    if (!email?.trim() || !phone?.trim() || !dateOfBirth?.trim() || !country?.trim() || !city?.trim() || !postcode?.trim()) {
      console.log("Empty fields detected:");
      if (!email?.trim()) console.log("- Email is empty");
      if (!phone?.trim()) console.log("- Phone is empty");
      if (!dateOfBirth?.trim()) console.log("- Date of Birth is empty");
      if (!country?.trim()) console.log("- Country is empty");
      if (!city?.trim()) console.log("- City is empty");
      if (!postcode?.trim()) console.log("- Postcode is empty");
      
      setAlert({ show: true, type: 'error', message: 'Please fill out all required fields.' });
      return false;
    }
   
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setAlert({ show: true, type: 'error', message: 'Invalid email address.' });
      return false;
    }
    return true;
  };

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await updateUserProfile(formData).unwrap();
      setAlert({ show: true, type: 'success', message: 'Profile updated successfully!' });
      dispatch(updateUser(response.user));
    } catch (error) {
      console.error("Error updating profile:", error);
      setAlert({ show: true, type: 'error', message: 'Failed to update profile.' });
    }
  };

  return (
    <div className={styles.accountDetails}>
      <p><BackButtonIcon /><Link href="/user/account"> Back</Link> </p>
      <h2>Account Details</h2>
      <form onSubmit={handleFormSubmission}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              readOnly={isReadOnly.email}
              ref={emailRef}
              required
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
          <label htmlFor="phone">Phone Number</label>
          <div className={styles.inputWrapper}>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              readOnly={isReadOnly.phone}
              ref={phoneRef}
              required
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
          <label htmlFor="dateOfBirth">Date of Birth*</label>
          <input
            type="date"
            id="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="country">Country/Region*</label>
          <select id="country" value={formData.country} onChange={handleChange} required>
            <option value="United Kingdom">United Kingdom</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="province">Province</label>
          <input
            type="text"
            id="province"
            value={formData.province}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="city">Town/City*</label>
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="postcode">Postcode*</label>
          <input
            type="text"
            id="postcode"
            value={formData.postcode}
            onChange={handleChange}
            required
          />
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
      {alert.show && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ ...alert, show: false })}
          duration={5000}
        />
      )}
    </div>
  );
};

export default AccountDetails;
