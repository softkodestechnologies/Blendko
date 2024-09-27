import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useMakePaymentMutation } from '@/services/userService';
import styles from './PickupForm.module.css';

interface PayButtonProps {
  cartItems: any[];
}

const PayButton: React.FC<PayButtonProps> = ({ cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [makePayment] = useMakePaymentMutation();
  const [loading, setLoading] = useState(false);

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
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        console.error('Error creating payment method:', error);
        setLoading(false);
        return;
      }

      const paymentMethodId = paymentMethod?.id;

      const paymentData = {
        items: cartItems,
        amount: calculateTotal(cartItems),
        currency: 'usd',
        paymentMethodId,
      };

      const response = await makePayment(paymentData).unwrap();

      if (response.clientSecret) {
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(response.clientSecret, {
          payment_method: paymentMethodId, 
        });

        if (confirmError) {
          console.error('Error confirming payment:', confirmError);
          setLoading(false);
          return;
        }

        if (paymentIntent?.status === 'succeeded') {
            console.log('Payment successful!');
            router.push('/order-confirmation'); // Redirect after successful payment
          } else if (paymentIntent?.status === 'requires_action') {
            // Handle 3D Secure authentication if required
            const { error, paymentIntent: updatedIntent } = await stripe.handleCardAction(response.clientSecret);
            if (error) {
              console.error('Error handling card action:', error);
            } else if (updatedIntent.status === 'succeeded') {
              console.log('Payment successful after 3D Secure!');
              router.push('/order-confirmation');
            }
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
