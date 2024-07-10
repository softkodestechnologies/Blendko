import React from 'react';
import styles from './Orders.module.css';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

const OrderDetails: React.FC = () => {
  const order = {
    id: '293736289313',
    date: '10-12-2024',
    total: '$2,445',
    items: [
      {
        id: '124524533',
        name: 'Shirt Vintage Extra Thick Cotton Material',
        price: '$4,500',
        salePrice: '$6,709',
        qty: 1,
      },
    ],
  };

  return (
    <div className={styles.orderDetails}>
      <Link href="/user/orders" className={styles.backLink}>
        <FaArrowLeft />
        <span>Order Details</span>
      </Link>
      <div className={styles.orderInfo}>
        <h2>Order #{order.id}</h2>
        <p>{order.items.length} items</p>
        <p>Placed on {order.date}</p>
        <p>Total {order.total}</p>
      </div>
      <div className={styles.orderItems}>
        <h3 className={styles.orderItemsTitle}>ITEMS IN YOUR ORDER</h3>

        <div className={styles.orderItemsContainer}>

            <div className={`flex space-between gap-10 ${styles.orderBtnGroup}`}>
                <div>
                  <div className={styles.delivered}>DELIVERED</div>
                </div>

                <div>
                    <button className={styles.buyAgain}>BUY AGAIN</button>
                    <button className={styles.trackOrder}>Track Order</button>
                </div>
            </div>

            {order.items.map((item) => (
            <div key={item.id} className={styles.orderItemDetails}>
                <div className={styles.itemImage}></div>
                <div className={styles.itemInfo}>
                <h4>{item.name}</h4>
                <p>Order #{item.id}</p>
                <p>QTY: {item.qty}</p>
                <div className={styles.itemPrice}>
                    <span className={styles.salePrice}>{item.salePrice}</span>
                    <span className={styles.originalPrice}>{item.price}</span>
                </div>
                </div>
            </div>
            ))}
        </div>
      </div>

      <div className={styles.paymentShippingContainer}>
        <div className={styles.paymentInfo}>
          <h3>Payment Method</h3>
          <p>Tap & Relax, Pay With Bank Transfer On Delivery</p>
          <h3>Payment Details</h3>
          <p>Items Total: $345</p>
          <p>Delivery Fees: $54</p>
          <p>Total: $3,083</p>
        </div>

        <div className={styles.shippingInfo}>
          <h3>Delivery Method</h3>
          <p>Door Delivery</p>
          <h3>Shipping Address</h3>
          <p>Femi Jude</p>
          <p>No. 38 Yusuw Iyuawo</p>
          <p>Texas, United States</p>
          <h3>Shipping Details</h3>
          <p>Door Delivery, Fulfilled By Gpower Ng</p>
          <p>Delivered Between 16-18 April</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;