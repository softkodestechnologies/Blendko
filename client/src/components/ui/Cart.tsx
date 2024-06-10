import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {IoClose, IoCheckmarkCircle} from 'react-icons/io5';
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
    <div className='cart-over'>
      {cartOpen && <div className="overlay" onClick={toggleCart}></div>}
      <div className="container">
        <div className={`cart-modal ${cartOpen ? 'open' : ''}`}>
          <div className="cart-header">
            <div className="flex align-y  11 cart-header-title">
              <IoCheckmarkCircle style={{color: "green"}} />
              <h3>Added to Bag</h3>
            </div>
            <button className="close-button" title="close" onClick={toggleCart}><IoClose /></button>
          </div>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <Image src={item.image} alt={item.title} width={80} height={80} />
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.category}</p>
                  <p>Size {item.size}</p>
                  <h5>${item.price}</h5>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-actions">
            <button className="view-bag-button"><Link href="/view-bag">View Bag ({cartItems.length})</Link></button>
            <button className="checkout-button">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
