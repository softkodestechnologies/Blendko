import Link from 'next/link';
import styles from './product_side.module.css';

function Header() {
  return (
    <div aria-labelledby="notice" className={`full-width ${styles.header}`}>
      <h1 id="notice">Free Delivery for Members.</h1>

      <p>
        Become a Nike Member to get fast and free delivery.{' '}
        <Link href={'/register'}>Join us</Link> or{' '}
        <Link href="/signin">Sign in</Link>
      </p>
    </div>
  );
}

export default Header;
