import ExploreSideBar from "@/components/aside/ExploreSideBar";
import Link from "next/link";
import styles from './returns.module.css';

export default function Returns() {
  return (
    <div className={styles.w_full}>
      <header className={styles.header}>
        <h1 className={styles.header_title}>Returns</h1>
        <hr className={styles.header_hr} />
      </header>
      <div className={`container ${styles.content_container}`}>

        <ExploreSideBar />
        <div className={styles.main_content}>
          <section className={styles.section}>
            <h1>RETURNS</h1>
            <p>
              Free 30-day return window from delivery. Additional exclusions apply, including for resellers. Please see our{" "}
              <Link href="/returns-policy">
                <span className={styles.text_underline}>Returns Policy</span>
              </Link>{" "}
              for full details.
            </p>
            <button className={styles.button}>START RETURN →</button>
            <hr className={styles.hr}/>
          </section>
          <section className={styles.section}>
            <h2>HOW TO RETURN AN ITEM</h2>
            <p>
              Everything you return should be in its original state and packaging. Make sure you don&apos;t cut off tags if there are any.
            </p>
            <p>
              <strong>By mail</strong>
              <br />
              Start a return on the website or on the app and follow the instructions. You&apos;ll receive all the details you need before dropping off your parcel at the drop-off point.
            </p>
            <button className={styles.button}>START A RETURN</button>
            <p className={styles.text_sm}>
              Want to know beforehand where the nearest drop-off point is? You can find this on FedEx&apos;s website.
            </p>
            <hr className={styles.hr}/>
          </section>
          <section className={styles.section}>
            <h2>REFUNDS</h2>
            <p>
              Once your return arrives at one of our warehouses and the quality has been approved, we&apos;ll initiate your refund.
            </p>
            <p>
              If you chose an e-gift card as the refund method, you&apos;ll receive this via email immediately after your return is approved.
            </p>
            <p>
              Did you choose to get a refund issued to your original payment method? Then, it can take up to 30 days to see the amount on your account, depending on your bank.
            </p>
            <p>
              However, in some cases, we reserve the right to make refunds through an adidas e-gift card. See our{" "}
              <Link href="/return-policy">
                <span className={styles.text_underline}>Return Policy</span>
              </Link>{" "}
              for details.
            </p>
            <p>
              Exclusions apply, including for resellers and those who provided an incorrect shipping address. Please see the Refund Details link below.
            </p>
            <button className={styles.button}>VIEW REFUND DETAILS →</button>
          </section>
        </div>
      </div>
    </div>
  );
}
