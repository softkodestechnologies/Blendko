import Head from 'next/head';
import ProductList from './ProductList';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import styles from './Shop.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>My E-commerce Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Sidebar />
        <MobileNav />
        <ProductList />
      </main>
    </div>
  );
}
