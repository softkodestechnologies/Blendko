"use client";
import React, { useState, useEffect } from 'react';
import styles from './Settings.module.css';
import { useGetDeliveryAddressQuery, useCreateDeliveryAddressMutation, useUpdateDeliveryAddressMutation } from '@/services/userService';
import Alert from "@/components/ui/alert/Alert";
import { CountryDropdown } from 'react-country-region-selector';

const DeliveryAddresses: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [alert, setAlert] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
    show: false,
    type: 'success',
    message: '',
  });

  const { data, isLoading, isError } = useGetDeliveryAddressQuery({});
  const [createDeliveryAddress, { isLoading: isCreating }] = useCreateDeliveryAddressMutation();
  const [updateDeliveryAddress, { isLoading: isUpdating }] = useUpdateDeliveryAddressMutation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    aptBuildingSuite: '',
    postcode: '',
    city: '',
    province: '',
    country: '',
    phoneNumber: '',
    isDefaultAddress: false,
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    street: '',
    postcode: '',
    city: '',
    province: '',
    country: '',
    phoneNumber: '',
  });

  useEffect(() => {
    if (data) {
      setFormData(data.deliveryAddress);
    }
  }, [data]);

  useEffect(() => {
    if (isEditing || isAdding) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isEditing, isAdding]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    });
    validateField(name, value);
  };

  const handleCountryChange = (val: string) => {
    setFormData({ ...formData, country: val });
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'firstName':
      case 'lastName':
        error = value.trim() ? '' : 'This field is required';
        break;
      case 'street':
        error = value.trim() ? '' : 'Street address is required';
        break;
      case 'postcode':
        error = value.trim() ? '' : 'Postcode is required';
        break;
      case 'city':
        error = value.trim() ? '' : 'City is required';
        break;
      case 'province':
        error = value.trim() ? '' : 'Province is required';
        break;
      case 'country':
        error = value ? '' : 'Country is required';
        break;
      case 'phoneNumber':
        error = /^\d+$/.test(value) ? '' : 'Please enter a valid phone number';
        break;
    }
    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      if (key !== 'aptBuildingSuite' && key !== 'isDefaultAddress') {
        const value = formData[key as keyof typeof formData];
        if (typeof value === 'string') {
          validateField(key, value);
          if (formErrors[key as keyof typeof formErrors]) {
            isValid = false;
          }
        }
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm();
    if (Object.values(formErrors).some(error => error !== '')) {
      setAlert({ show: true, type: 'error', message: 'Please correct the errors in the form.' });
      return;
    }
    try {
      if (isEditing) {
        await updateDeliveryAddress(formData).unwrap();
        setAlert({ show: true, type: 'success', message: 'Delivery address updated successfully!' });
      } else {
        await createDeliveryAddress(formData).unwrap();
        setAlert({ show: true, type: 'success', message: 'Delivery address created successfully!' });
      }
      setIsEditing(false);
      setIsAdding(false);
    } catch (error) {
      console.error("Error handling delivery address:", error);
      setAlert({ show: true, type: 'error', message: 'Failed to handle delivery address.' });
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit}>
      <h3>{isEditing ? 'Update' : 'Add'} Address</h3>
      {isAdding && (
        <>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleFormChange} placeholder="First Name" required />
          {formErrors.firstName && <span className={styles.error}>{formErrors.firstName}</span>}
          <input type="text" name="lastName" value={formData.lastName} onChange={handleFormChange} placeholder="Last Name" required />
          {formErrors.lastName && <span className={styles.error}>{formErrors.lastName}</span>}
        </>
      )}
      <input type="text" name="street" value={formData.street} onChange={handleFormChange} placeholder="Street Address" required />
      {formErrors.street && <span className={styles.error}>{formErrors.street}</span>}
      <input type="text" name="aptBuildingSuite" value={formData.aptBuildingSuite} onChange={handleFormChange} placeholder="Apt, Suite, Building" />
      <div className='flex gap-20'>
        <div>
          <input type="text" name="postcode" value={formData.postcode} onChange={handleFormChange} placeholder="Postcode" required />
          {formErrors.postcode && <span className={styles.error}>{formErrors.postcode}</span>}
        </div>
        <div>
          <input type="text" name="city" value={formData.city} onChange={handleFormChange} placeholder="Town/City" required />
          {formErrors.city && <span className={styles.error}>{formErrors.city}</span>}
        </div>
      </div>
      <div className='flex gap-20'>
        <div>
          <input type="text" name="province" value={formData.province} onChange={handleFormChange} placeholder="Province" required />
          {formErrors.province && <span className={styles.error}>{formErrors.province}</span>}
        </div>
        <div>
          <CountryDropdown
            value={formData.country}
            onChange={handleCountryChange}
            aria-label="Country"
          />
          {formErrors.country && <span className={styles.error}>{formErrors.country}</span>}
        </div>
      </div>
      <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleFormChange} placeholder="Phone Number" required />
      {formErrors.phoneNumber && <span className={styles.error}>{formErrors.phoneNumber}</span>}
      <div className={styles.checkboxWrapper}>
        <label>
          <input 
            type="checkbox" 
            name="isDefaultAddress" 
            checked={formData.isDefaultAddress} 
            onChange={handleFormChange} 
          /> 
          <span>Set as default delivery address</span>
        </label>
      </div>
      <div className={styles.formActions}>
        <button type="submit">{isEditing ? 'Update' : 'Add'} Address</button>
        <button type="button" onClick={() => { setIsEditing(false); setIsAdding(false); }}>Cancel</button>
      </div>
    </form>
  );

  return (
    <div className={styles.deliveryAddresses}>
      <h2>Saved Delivery Addresses</h2>
      {data && (
        <div className={styles.address}>
          <p>{data.deliveryAddress.street}</p>
          <p>{data.deliveryAddress.city}, {data.deliveryAddress.province} {data.deliveryAddress.postcode}</p>
          <p>{data.deliveryAddress.country}</p>
          <p>{data.deliveryAddress.phoneNumber}</p>
        </div>
      )}
      <div className={styles.buttons}>
        {data && <button className={styles.edit} onClick={() => { setIsEditing(true); setIsAdding(false); }}>Edit</button>}
        <button className={styles.addButton} onClick={() => { setIsAdding(true); setIsEditing(false); }}>Add Address</button>
      </div>
      
      {(isEditing || isAdding) && (
        <div className={styles.popupForm}>
          {renderForm()}
        </div>
      )}
      {alert.show && 
      <Alert 
          type={alert.type} 
          onClose={() => setAlert({ ...alert, show: false })} 
          message={alert.message} 
        />
      }
    </div>
  );
};

export default DeliveryAddresses;