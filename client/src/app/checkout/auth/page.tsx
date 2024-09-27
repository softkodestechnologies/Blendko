  'use client';
  import React, { useEffect } from 'react';
  import { useState } from 'react';
  import { useRouter } from 'next/navigation';
  import dynamic from 'next/dynamic';
  import Image from 'next/image';
  import { useSelector } from 'react-redux';
  import { RootState } from '@/services/store';
  import styles from './CheckoutAuth.module.css';

  const LoginModal = dynamic(() => import('@/components/ui/modal/LoginModal'), { ssr: false });
  const SignUpModal = dynamic(() => import('@/components/ui/modal/SignUpModal'), { ssr: false });


  const CheckoutAuthPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const router = useRouter();

    useEffect(() => {
      if (user) {
        router.push('/checkout');
      }
    }, [user, router]);

    const [showModal, setShowModal] = useState(false);
    const [showSignModal, setShowSignModal] = useState(false);

    const handleLoginClick = () => {
      setShowModal(true);
    };

    const handleSignUpClick = () => {
      setShowSignModal(true);
    }

    const handleCloseModal = () => {
      setShowModal(false);
      router.push('/checkout');
    };

    const handleCloseSignModal = () => {
      setShowSignModal(false);
      router.push('/checkout');
    }

    return (
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Choose How You Would Like To Check Out</h2>
        <div className={styles.optionsContainer}>
          <div className={styles.memberOption}>
            <h3>Check out as a Member for free delivery</h3>
            <p>Use your Nike Member sign-in for Nike.com, NRC, NTC, SNKRS or the Nike App.</p>
            <button className={styles.loginButton} onClick={handleLoginClick}>Log in</button>
              {showModal && <LoginModal isOpen={showModal} onRequestClose={handleCloseModal} />}
            <button className={styles.signupButton} onClick={handleSignUpClick}>Sign Up</button>
              {showSignModal && <SignUpModal isOpen={showSignModal} onRequestClose ={handleCloseSignModal} />} 
          </div>
          <div className={styles.guestOption}>
            <h3>Check out as a Guest</h3>
            <p>You can create a free Nike Member Profile at any point during the checkout process.</p>
            <button className={styles.guestButton}>Guest Checkout</button>
          </div>
        </div>
        <div className={styles.divider}>OR</div>
        <div className={styles.socialLogin}>
          <h3>Sign in with your google / Apple account</h3>
          <button className={styles.googleButton}>
            <Image src="/google-icon.png" alt="Google" layout="fill" />
            Continue with Google
          </button>
          <button className={styles.appleButton}>
            <Image src="/apple-icon.png" alt="Apple" layout="fill"/>
            Continue with Apple
          </button>
        </div>
      </div>
    );
  };

export default CheckoutAuthPage;