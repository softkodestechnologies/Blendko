"use client"
import React, { useState } from 'react';
import styles from './Orders.module.css';
import { FaArrowLeft, FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGetOrderByIdQuery } from '@/services/userService';

const OrderReturn: React.FC = () => {
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const orderid = searchParams.get('orderid');
  const { data: order, isLoading, isError } = useGetOrderByIdQuery(orderid);

  const returnReasons = [
    'Item not as described',
    'Wrong size',
    'Defective item',
    'Changed my mind',
  ];

  const [formData, setFormData] = useState({
    itemToReturn: false,
    returnReason: '',
    description: '',
    returnMethod: '',
  });

  const [errors, setErrors] = useState({
    itemToReturn: '',
    returnReason: '',
    description: '',
    returnMethod: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { itemToReturn: '', returnReason: '', description: '', returnMethod: '' };

    if (!formData.itemToReturn) {
      newErrors.itemToReturn = 'Please select an item to return';
      isValid = false;
    }
    if (!formData.returnReason) {
      newErrors.returnReason = 'Please select a reason for return';
      isValid = false;
    }
    if (!formData.description) {
      newErrors.description = 'Please describe what you experienced';
      isValid = false;
    }
    if (!formData.returnMethod) {
      newErrors.returnMethod = 'Please select a return method';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      // Handle form submission
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading order details</div>;

  return (
    <div className={styles.orderReturn}>
      <Link href="/user/orders" className={styles.backLink}>
        <FaArrowLeft />
        <span>Orders / Return</span>
      </Link>
      <h2>Choose the items you&apos;d like to return.</h2>
      <form onSubmit={handleSubmit} className={styles.returnForm}>
        <div>
          <div className={styles.returnItem}>
            <div className={styles.itemImage}></div>
            <div className={styles.itemInfo}>
              <h3>{order?.orderItems[0].name}</h3>
              <p>Order #{order?.orderNumber}</p>
              <div className={styles.itemStatus}>
                <span className={styles[order?.orderStatus.toLowerCase()]}>{order?.orderStatus}</span>
                <span>On {new Date(order?.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <label className={styles.checkbox} htmlFor="itemToReturn">
              <input
                type="checkbox"
                name="itemToReturn"
                id="itemToReturn"
                checked={formData.itemToReturn}
                onChange={handleChange}
                title="Select the item to return"
              />
              <span className={styles.checkmark}></span>
            </label>
          </div>
          {errors.itemToReturn && <div className={styles.errorMessage}>{errors.itemToReturn}</div>}

          <div className={styles.returnReason}>
            <select
              name="returnReason"
              value={formData.returnReason}
              onChange={handleChange}
              className={styles.reasonSelect}
              title="Reason for Return"
            >
              <option value="">Reason for Return</option>
              {returnReasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
            <FaChevronDown className={styles.selectArrow} />
          </div>
          {errors.returnReason && <div className={styles.errorMessage}>{errors.returnReason}</div>}

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.descriptionInput}
            placeholder="Describe what you experienced"
          />
          {errors.description && <div className={styles.errorMessage}>{errors.description}</div>}
        </div>

        <div className={styles.refundSummary}>
          <button type="submit" className={styles.continueButton}>
            Continue
          </button>
          <hr />
          <div className="flex space-between gap-20">
            <h3>Refund Method</h3>
            <div className={styles.mastercard}></div>
          </div>
          <hr />
          <h3>Summary</h3>
          <p className={styles.grayText}><span>Subtotal:</span> ${order?.itemsPrice.toFixed(2)}</p>
          <p className={styles.grayText}><span>Estimated Tax:</span> ${order?.taxPrice.toFixed(2)}</p>
          <p><span>Refund Total:</span> ${order?.totalPrice.toFixed(2)}</p>
        </div>
      </form>
    </div>
  );
};
export default OrderReturn;