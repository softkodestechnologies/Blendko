'use client';
import React, { useState, useEffect } from 'react';
import Modal from './modal/Modal';
import { setCookie, getCookie } from '../../utils/cookieUtils';
import Link from 'next/link';
import './CookieConsent.css';

const CookieConsent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const cookieConsent = getCookie('cookieConsent');
    if (!cookieConsent) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie('cookieConsent', 'accepted', 365);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleAccept}
      title=""
      className="consent-modal"
    >
      <h2 className="consent-title">We use Cookies</h2>

      <p className="consent-p-one">
        We use cookies and similar technologies to enhance site navigation,
        analyze site usage, and assist our marketing efforts. By continuing to
        use this website, you agree to these conditions of use.
      </p>

      <p className="consent-p-two">
        For more information about these technologies and their use on this
        website, please consult our{' '}
        <Link href="/cookies" className="link">
          Cookie Policy.
        </Link>
      </p>

      <button
        className="modal-button consent-button flex center"
        onClick={handleAccept}
      >
        OK
      </button>
    </Modal>
  );
};

export default CookieConsent;
