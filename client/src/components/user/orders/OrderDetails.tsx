"use client";
import React,  {useEffect} from 'react';
import styles from './Orders.module.css';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { addToCart } from '@/services/userSlice';
import { useDispatch } from 'react-redux';
import {useGetOrderByIdQuery } from '@/services/userService';

const OrderDetails: React.FC = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const orderId = params?.orderid as string;

  const { data: { order } = {}, isLoading, isError } = useGetOrderByIdQuery(orderId, {
    skip: !orderId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading order details</div>;
  if (!order) return <div>No order found</div>;


  const handleBuyAgain = (orderItems: any) => {
    orderItems.map((item: any) => {
      const product = item.product;
      const quantity = item.quantity;
      
      dispatch(addToCart({
        ...product,
        quantity,
        selectedSize: product.sizes[0], 
        selectedColor: product.colors[0], 
      }));

      router.push('/view-bag');
    });
  }

  return (
    <div className={styles.orderDetails}>
      <Link href="/user/orders" className={styles.backLink}>
        <FaArrowLeft />
        <span>Order Details</span>
      </Link>
      <div className={styles.orderInfo}>
        <h2>Order #{order.orderNumber}</h2>
        <p>{order?.orderItems.length} items</p>
        <p>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
        <p>Total ${order.totalPrice.toFixed(2)}</p>
      </div>
      <div className={styles.orderItems}>
        <h3 className={styles.orderItemsTitle}>ITEMS IN YOUR ORDER</h3>
        <div className={styles.orderItemsContainer}>
          <div className={`flex space-between gap-10 ${styles.orderBtnGroup}`}>
            <div>
              <div className={styles.delivered}>{order.orderStatus}</div>
            </div>
            <div>
              <button onClick={()=>handleBuyAgain(order.orderItems)} className={styles.buyAgain}>BUY AGAIN</button>
              <button className={styles.trackOrder}>Track Order</button>
            </div>
          </div>
          {order.orderItems.map((item: {
            _id: string
            name: string
            quantity: number
            price: number
            discount: number
          }) => (
            <div key={item._id} className={styles.orderItemDetails}>
              <div className={styles.itemImage}></div>
              <div className={styles.itemInfo}>
                <h4>{item.name}</h4>
                <p>Order #{order.orderNumber}</p>
                <p>QTY: {item.quantity}</p>
                <div className={styles.itemPrice}>
                  <span className={styles.salePrice}>${item.price.toFixed(2)}</span>
                  <span className={styles.originalPrice}>${(item.price / (1 - item.discount / 100)).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.paymentShippingContainer}>
        <div className={styles.paymentInfo}>
          <h3>Payment Method</h3>
          <p>{order.paymentInfo.status}</p>
          <h3>Payment Details</h3>
          <p>Items Total: ${order.itemsPrice.toFixed(2)}</p>
          <p>Delivery Fees: ${order.shippingPrice.toFixed(2)}</p>
          <p>Total: ${order.totalPrice.toFixed(2)}</p>
        </div>
        <div className={styles.shippingInfo}>
          <h3>Delivery Method</h3>
          <p>{order.type}</p>
          <h3>Shipping Address</h3>
          <p>{order.shippingInfo.firstName} {order.shippingInfo.lastName}</p>
          <p>{order.shippingInfo.address}</p>
          <p>{order.shippingInfo.city}, {order.shippingInfo.country}</p>
          <h3>Shipping Details</h3>
          <p>{order.type}, Fulfilled By Gpower Ng</p>
          <p>Delivered on {order.deliveredAt ? new Date(order.deliveredAt).toLocaleDateString() : 'Not delivered yet'}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;