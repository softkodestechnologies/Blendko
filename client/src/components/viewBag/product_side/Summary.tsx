import Link from 'next/link';
import React, { useState } from 'react';
import styles from './product_side.module.css';

import Accordion from '@/components/ui/accordion/Accordion';
import { ChevronDown, HintIcon, PayPalIcon } from '../../../../public/svg/icon';

interface SummaryProps {
  cartItems: any[];
  appliedDiscount: any;
  onApplyDiscount: (count: string) => void;
}
function Summary({ cartItems, appliedDiscount, onApplyDiscount }: SummaryProps) {

  const [promoCode, setPromoCode] = useState('');

  const subtotal = cartItems.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0
  );

  const discountAmount = appliedDiscount
    ? appliedDiscount.type === 'percentage'
      ? (subtotal * appliedDiscount.value) / 100
      : appliedDiscount.value
    : 0;

  const total = subtotal - discountAmount;

  const handleApplyPromo = () => {
    onApplyDiscount(promoCode);
    console.log(cartItems)
  };

  return (
    <div aria-labelledby="summary" className={`${styles.summary}`}>
      <h2 id="summary">Summary</h2>

      <Accordion
        className={styles.promo_code}
        head={
          <>
            <h3>Do you have a Promo Code?</h3>

            <ChevronDown />
          </>
        }
        body={
          <>
            <input 
              type="text" 
              placeholder="Enter Promo Code" 
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button onClick={handleApplyPromo}>Apply</button>
          </>
        }
      />

      <ul className={`flex flex-col ${styles.price_breakdown}`}>
        <li className={`flex align-y space-between ${styles.subtotal}`}>
          <p className={`flex align-y`}>
            Subtotal
            <button type="button" className="flex align-y" title="Subtotal Information">
              <HintIcon />
            </button>
          </p>
          <p>${subtotal.toFixed(2)}</p>
        </li>

        {appliedDiscount && (
          <li className={`flex align-y space-between ${styles.discount}`}>
            <p>Discount ({appliedDiscount.name})</p>
            <p>-${discountAmount.toFixed(2)}</p>
          </li>
        )}

        <li className={`flex align-y space-between ${styles.delivery_cost}`}>
          <p>Estimated delivery & Handling</p>

          <p>Free</p>
        </li>

        <li className={`flex align-y space-between ${styles.total}`}>
          <p>Total</p>
          <p>
            $
            {cartItems
              .reduce(
                (acc: number, item: any) =>
                  acc +
                  (item.price - (item.price * item.discount || 0) / 100) *
                    item.quantity,
                0
              )
              .toFixed(2)}
          </p>
        </li>
      </ul>

      <div className={`flex flex-col ${styles.checkout}`}>
        <Link href="/checkout" className={`full-width flex center`}>
          Checkout
        </Link>

        <button
          type="button"

          aria-label="Pay with PayPal"
          className={`full-width flex center`}
        >
          <PayPalIcon />
        </button>
      </div>
    </div>
  );

}
export default Summary;
