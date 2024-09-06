'use client';

import { useState, useEffect } from 'react';

import Modal from './modal/Modal';
import { getCookie } from '../../utils/cookieUtils';
import { ShopBagIcon, Xicon } from '../../../public/svg/icon';

const ShoppingPreferences: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const cookieConsent = getCookie('cookieConsent');
    const userPreference = localStorage.getItem('shoppingPreference');
    if (cookieConsent && !userPreference) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handlePreference = (data: string) => {
    localStorage.setItem('shoppingPreference', data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      title="VISITING FROM  INTERNATIONAL?"
    >
      <p>
        You can sitch to this country to see information tailored to your
        location.
      </p>

      <div className="flex align-y button-group">
        <button
          className="flex align-y align-x modal-button btn-shopping-primary full-width"
          onClick={() => handlePreference('US')}
          style={{ gap: '10px' }}
        >
          <ShopBagIcon />
          Continue to United States
        </button>

        <button
          className="modal-button full-width"
          onClick={() => handlePreference('International')}
        >
          Switch to International
        </button>
      </div>

      <button className="modal-button close" onClick={handleClose}>
        <Xicon />
      </button>
    </Modal>
  );
};

export default ShoppingPreferences;
