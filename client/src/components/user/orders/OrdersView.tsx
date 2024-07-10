"use client";
import React, { useState } from 'react';
import styles from './Orders.module.css';
import { FaEye } from 'react-icons/fa';
import Link from 'next/link';

const OrdersView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ongoing');

  const orders = [
    {
      id: '124524533',
      name: 'Shirt Vintage Extra Thick Cotton Material',
      status: 'DELIVERED',
      date: '12-03-24',
    },
    {
      id: '124524534',
      name: 'Shirt Vintage Extra Thick Cotton Material',
      status: 'CANCELLED',
      date: '12-03-24',
    },
    {
      id: '124524535',
      name: 'Shirt Vintage Extra Thick Cotton Material',
      status: 'DELIVERED',
      date: '12-03-24',
    },
    {
      id: '124524536',
      name: 'Shirt Vintage Extra Thick Cotton Material',
      status: 'DELIVERED',
      date: '12-03-24',
    },{
      id: '124524537',
      name: 'Shirt Vintage Extra Thick Cotton Material',
      status: 'CANCELLED',
      date: '12-03-24',
    },{
      id: '124524538',
      name: 'Shirt Vintage Extra Thick Cotton Material',
      status: 'CANCELLED',
      date: '12-03-24',
    },
  ];

  
  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'ongoing') {
      return order.status === 'DELIVERED';
    } else if (activeTab === 'cancelled') {
      return order.status === 'CANCELLED';
    }
    return false;
  });

  return (
    <div className={styles.ordersView}>
      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tab} ${activeTab === 'ongoing' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('ongoing')}
        >
          ONGOING / DELIVERED (24)
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'cancelled' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('cancelled')}
        >
          CANCELLED / RETURNED
        </button>
      </div>
      <div className={styles.ordersList}>
        {filteredOrders.map((order) => (
          <div key={order.id} className={styles.orderItem}>
            <div className={styles.orderImage}></div>

            <div className={styles.orderInfo}>
              <h3>{order.name}</h3>
              <p>Order #{order.id}</p>
              <div className={styles.orderStatus}>
                <span className={styles[order.status.toLowerCase()]}>{order.status}</span>
                <div>On {order.date}</div>
              </div>
            </div>

            <div className="flex space-between align-y gap-10">
              <Link href={`/user/orders/${order.id}`} className={styles.seeDetails}>
                <span>See Details</span>
              </Link>

              <Link href={`/user/orders/${order.id}`} className={styles.trackOrder}>
                <span>Track Order</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersView;
