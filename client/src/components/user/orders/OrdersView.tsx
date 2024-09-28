"use client";
import React, { useState } from 'react';
import styles from './Orders.module.css';
import Link from 'next/link';
import { useGetMyOrdersQuery } from '@/services/userService';

const OrdersView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const { data, isLoading, isError } = useGetMyOrdersQuery({});

  const orders = data?.orders || [];

  const filteredOrders = orders.filter((order: { orderStatus: string }) => {
    if (activeTab === 'ongoing') {
      return ['Pending', 'Confirmed', 'Processing', 'Picked', 'Shipped', 'Delivered'].includes(order.orderStatus);
    } else if (activeTab === 'cancelled') {
      return order.orderStatus === 'Cancelled';
    }
    return false;
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading orders</div>;

  return (
    <div className={styles.ordersView}>
      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tab} ${activeTab === 'ongoing' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('ongoing')}
        >
          ONGOING / DELIVERED ({orders.filter((order: { orderStatus: string }) => order.orderStatus !== 'Cancelled').length})
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'cancelled' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('cancelled')}
        >
          CANCELLED / RETURNED ({orders.filter((order: { orderStatus: string }) => order.orderStatus === 'Cancelled').length})
        </button>
      </div>
      <div className={styles.ordersList}>
        {filteredOrders.map((order: {
          _id: string
          orderItems: Array<{ name: string }>
          orderNumber: string
          orderStatus: string
          createdAt: string
        }) => (
          <div key={order._id} className={styles.orderItem}>
            <div className={styles.orderImage}></div>
            <div className={styles.orderInfo}>
              <h3>{order.orderItems[0].name}</h3>
              <p>Order #{order.orderNumber}</p>
              <div className={styles.orderStatus}>
                <span className={styles[order.orderStatus.toLowerCase()]}>{order.orderStatus}</span>
                <div>On {new Date(order.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
            <div className="flex space-between align-y gap-10">
              <Link href={`/user/orders/${order._id}`} className={styles.seeDetails}>
                <span>See Details</span>
              </Link>
              <Link href={`/user/orders/${order._id}`} className={styles.trackOrder}>
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
