import Link from 'next/link';

import styles from './product_side.module.css';

import Accordion from '@/components/ui/accordion/Accordion';
import { ChevronDown, HintIcon, PayPalIcon } from '../../../../public/svg/icon';

function Summary({ cartItems }: { cartItems: any[] }) {
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
            <input type="text" placeholder="Enter Promo Code" />
          </>
        }
      />

      <ul className={`flex flex-col ${styles.price_breakdown}`}>
        <li className={`flex align-y space-between ${styles.subtotal}`}>
          <p className={`flex align-y`}>
            Subtotal
            <button type="button" className="flex align-y">
              <HintIcon />
            </button>
          </p>

          <p>
            $
            {cartItems
              .reduce(
                (acc: number, item: any) => acc + item.price * item.quantity,
                0
              )
              .toFixed(2)}
          </p>
        </li>

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
          aria-label="Pay with paypal"
          className={`full-width flex center`}
        >
          <PayPalIcon />
        </button>
      </div>
    </div>
  );
}

export default Summary;
