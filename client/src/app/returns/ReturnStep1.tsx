import styles from './returns.module.css';

import { ButtonArrow, ButtonArrowDark } from '../../../public/svg/icon';

function ReturnStep1({
  aria,
  onStepChange,
}: {
  aria: string;
  onStepChange: (step: number) => void;
}) {
  return (
    <div className={`section_container ${styles.content}`}>
      <h2 aria-labelledby={aria}>RETURNS</h2>

      <p>
        Free 30-day return window from delivery. Additional exclusions apply,
        including for resellers. Please see our Returns Policy for full details.
      </p>

      <button className={`flex center`} onClick={() => onStepChange(2)}>
        Start return <ButtonArrow />
      </button>

      <hr />

      <section className={`${styles.sub_section}`}>
        <h3>HOW TO RETURN AN ITEM</h3>

        <p>
          Everything you return should be in its original state and packaging.
          Make sure you don’t cut off tags if there are any.
        </p>

        <h4>By mail</h4>

        <p>
          Start a return on the website or on the app and follow the
          instructions. You’ll receive all the details you need before dropping
          off your parcel at the drop-off point. 
        </p>

        <span>
          <button>Start a return</button>

          <small>
            Want to know beforehand where the nearest drop-off point is? You can
            find this on FedEx’ website.
          </small>
        </span>
      </section>

      <hr />

      <section className={`${styles.sub_section}`}>
        <h3>REFUNDS</h3>

        <ul>
          <li>
            Once your return arrives at one of our warehouses and the quality
            has been approved, we’ll initiate your refun
          </li>
          <li>
            If you chose an e-gift card as the refund method, you’ll receive
            this via email immediately after your return is approved.
          </li>
          <li>
            Did you choose to get a refund issued to your original payment
            method? Then, it can take up to 30 days to see the amount on your
            account, depending on your bank.
          </li>
          <li>
            However, in some cases, we reserve the right to make refunds through
            an adidas e-gift card. See our Return Policy for details.
          </li>
          <li>
            Exclusions apply, including for resellers and those who provided an
            incorrect shipping address. Please see the Refund Details link
            below.
          </li>
        </ul>

        <button className={`flex center`}>
          VIEW REFUND DETAILS <ButtonArrowDark />
        </button>
      </section>
    </div>
  );
}

export default ReturnStep1;
