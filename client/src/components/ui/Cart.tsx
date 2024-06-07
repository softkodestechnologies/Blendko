import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {IoClose} from 'react-icons/io5';
import './Cart.css';

interface CartProps {
  cartOpen: boolean;
  toggleCart: () => void;
  cartItems: Array<{
    id: number;
    title: string;
    category: string;
    size: string;
    price: number;
    image: string;
  }>;
}

const Cart: FC<CartProps> = ({ cartOpen, toggleCart, cartItems }) => {
  return (
    <>
      {cartOpen && <div className="overlay" onClick={toggleCart}></div>}
      <div className={`cart-modal ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Added to Bag</h2>
          <button className="close-button" title="close" onClick={toggleCart}><IoClose /></button>
        </div>
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <Image src={item.image} alt={item.title} width={80} height={80} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.category}</p>
                <p>Size {item.size}</p>
                <p>${item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-actions">
          <button className="view-bag-button"><Link href="/view-bag">View Bag ({cartItems.length})</Link></button>
          <button className="checkout-button">Checkout</button>
        </div>
      </div>
    </>
  );
};

export default Cart;
