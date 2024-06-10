import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './viewBagPage.module.css';

// Mock data for cart items and recommendation items
const cartItems = [
  {
    id: 1,
    imageSrc: '/picture.png',
    altText: 'One Life Graphic T-shirt',
    title: 'One Life Graphic T-shirt',
    description: "Men's Shirts",
    size: 'Size Medium',
    price: '$260'
  },
  {
    id: 2,
    imageSrc: '/picture.png',
    altText: 'One Life Graphic T-shirt',
    title: 'One Life Graphic T-shirt',
    description: "Men's Shirts",
    size: 'Size Medium',
    price: '$260'
  },
  // Add more cart items here
];

const recommendationItems = [
  {
    id: 1,
    imageSrc: '/picture.png',
    altText: 'Polo with Contrast Trims',
    title: 'Polo with Contrast Trims',
    price: '$212'
  },
  {
    id: 2,
    imageSrc: '/picture.png',
    altText: 'Gradient Graphic T-shirt',
    title: 'Gradient Graphic T-shirt',
    price: '$145'
  },
  {
    id: 2,
    imageSrc: '/picture.png',
    altText: 'Gradient Graphic T-shirt',
    title: 'Gradient Graphic T-shirt',
    price: '$145'
  },
  {
    id: 2,
    imageSrc: '/picture.png',
    altText: 'Gradient Graphic T-shirt',
    title: 'Gradient Graphic T-shirt',
    price: '$145'
  },
];

const ViewBagPage: React.FC = () => {
  return (
    <div className="container">
      <header className={styles.header}>
        <h1 className={styles.freeDelivery}>Free Delivery for Members.</h1>
        <p className={styles.tagline}>Become a Blendko member to get fast and free delivery. <Link href="/join">Join us</Link> or <Link href="/signin">Sign in</Link></p>
      </header>
      <div className={styles.main}>
        <section className={styles.cartSection}>
          <h2 className={styles.cartTitle}>Bag</h2>
          <div className={styles.cartItems}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <Image src={item.imageSrc} alt={item.altText} width={100} height={100} />
                <div className={styles.itemDetails}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>{item.size}</p>
                  <p>{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className={styles.summary}>
          <h2 className={styles.summaryTitle}>Summary</h2>
          <div className={styles.summaryDetails}>
            <p>Subtotal: $320.12</p>
            <p>Estimated delivery & Handling: Free</p>
            <h3>Total: $699.90</h3>
          </div>
          <button className={styles.checkoutButton}>Checkout</button>
          <button className={styles.paypalButton}>PayPal</button>
        </section>
      </div>
      <RecommendationSection items={recommendationItems} />
    </div>
  );
};

const RecommendationSection: React.FC<{ items: typeof recommendationItems }> = ({ items }) => {
  return (
    <section className={styles.recommendations}>
      <h2 className={styles.recommendations_title}>You might also like</h2>
      <div className={styles.recommendationItems}>
        {items.map(item => (
          <div key={item.id} className={styles.recommendationItem}>
            <Image src={item.imageSrc} alt={item.altText} width={200} height={200} />
            <div className={styles.recommendationDetails}>
              <h3>{item.title}</h3>
              <p>{item.price}</p>
            </div>1
          </div>
        ))}
      </div>
    </section>
  );
};

export default ViewBagPage;
