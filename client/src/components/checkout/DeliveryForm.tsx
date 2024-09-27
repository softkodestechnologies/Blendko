import React, { useState, useEffect } from 'react';
import styles from './DeliveryForm.module.css';

const DeliveryForm: React.FC<{ user: any }> = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    addressLine: '',
    aptBuildingSuite: '',
    townCity: '',
    postcode: '',
    country: 'United Kingdom',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.name || '',
        lastName: user.lastName || '',
        addressLine: user.street || '',
        aptBuildingSuite: user?.aptBuildingSuite || '',
        townCity: user?.city || '',
        postcode: user?.postcode || '',
        country: user?.country || 'United Kingdom',
        email: user.email || '',
        phoneNumber: user.phone || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className={styles.deliveryForm}>
      <div className={styles.formRow}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name*"
          required
          className={styles.formInput}
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name*"
          required
          className={styles.formInput}
        />
      </div>
      <input
        type="text"
        name="addressLine"
        value={formData.addressLine}
        onChange={handleChange}
        placeholder="Address Line 1"
        required
        className={styles.formInput}
      />
      <a href="#" className={styles.addCompanyLink}>+ Add Company, C/O, Apt, Suite, Unit</a>
      <div className={styles.formRow}>
        <input
          type="text"
          name="townCity"
          value={formData.townCity}
          onChange={handleChange}
          placeholder="Town/City"
          required
          className={styles.formInput}
        />
        <input
          type="text"
          name="postcode"
          value={formData.postcode}
          onChange={handleChange}
          placeholder="Postcode*"
          required
          className={styles.formInput}
        />
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className={styles.countrySelect}
          aria-label="Country"
        >
          <option value="United Kingdom">United Kingdom</option>
        </select>
      </div>
      <div className={styles.formRow}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email*"
          required
          className={styles.formInput}
        />
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number*"
          required
          className={styles.formInput}
        />
      </div>
      <button type="submit" className={styles.saveButton}>Save & Continue</button>
    </form>
  );
};

export default DeliveryForm;
