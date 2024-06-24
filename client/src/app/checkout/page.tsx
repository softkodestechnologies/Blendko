'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const LoginModal = dynamic(() => import('@/components/ui/modal/LoginModal'), { ssr: false });

export default function CheckoutPage() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/checkout'); // Redirect to checkout page after closing the modal
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handleLoginClick}>Login</button>
      {showModal && <LoginModal isOpen={showModal} onRequestClose={handleCloseModal} />}
    </div>
  );
}
