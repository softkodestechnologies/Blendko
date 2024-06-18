"use client";
import React, { useState, useEffect } from 'react';
import Modal from './modal/Modal';
import { getCookie } from '../../utils/cookieUtils';
import { GiShoppingBag } from 'react-icons/gi';


const ShoppingPreferences: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const cookieConsent = getCookie('cookieConsent');
    if (cookieConsent) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} title="Visiting from International?">
      <p>
        You can switch to this country to see information tailored to your
        location.
      </p>
      <div className="flex align-y align-x button-group">
        <button className="flex align-y modal-button btn-shopping-primary" onClick={handleClose}><GiShoppingBag size={25}/>Continue to United States</button>
        <button className="modal-button" onClick={handleClose}>Switch to International</button>
      </div>
      <button className="modal-button close" onClick={handleClose}>&times;</button>
    </Modal>
  );
};

export default ShoppingPreferences;
