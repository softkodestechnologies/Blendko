import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useMakePaymentMutation } from '@/services/userService';
import styles from './PickupForm.module.css';

interface PayButtonProps {
  cartItems: any[];
  userId: string;
}

const PayButton: React.FC<PayButtonProps> = ({ cartItems, userId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [makePayment] = useMakePaymentMutation();
  const [loading, setLoading] = useState(false);

  console.log('UserId, ', userId)

  const handlePayment = async () => {
    setLoading(true);
    if (!stripe || !elements) {
      console.error('Stripe or elements not loaded');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error('CardElement not found');
      setLoading(false);
      return;
    }

    try {
      const paymentData = {
        items: cartItems,
        amount: calculateTotal(cartItems),
        userId,
        currency: 'usd',
        metadata: {
          userId: userId,
          cartItems: JSON.stringify(cartItems.map(item => ({
            id: item._id,
            quantity: item.quantity
          })))
        },
      };

      const response = await makePayment(paymentData).unwrap();
     
      if (response.clientSecret) {
        const { error, paymentIntent } = await stripe.confirmCardPayment(response.clientSecret, {
          payment_method: {
            card: cardElement,
          }
        });

        if (error) {
          console.error('Error confirming payment:', error);
        } else if (paymentIntent.status === 'succeeded') {
          console.log('Payment successful!');
          router.push('/success');
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
    setLoading(false);
  };

  const calculateTotal = (items: any[]) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <CardElement />
      <button className={styles.payButton} onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </div>
  );
};

export default PayButton;