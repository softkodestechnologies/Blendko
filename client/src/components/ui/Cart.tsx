import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import './Cart.css';

interface CartProps {
  cartOpen: boolean;
  toggleCart: () => void;
  cartItems: Array<{
    _id: string;
    name: string;
    category: string;
    quantity: number;
    price: number;
    images: Array<{ url: string }>;
  }>;
}

const Cart: FC<CartProps> = ({ cartOpen, toggleCart, cartItems }) => {
  return (
    <div className='cart-over'>
      {cartOpen && <div className="overlay" onClick={toggleCart}></div>}
      <div className="cart-container">
        <div className={`cart-modal ${cartOpen ? 'open' : ''}`}>
          <div className="cart-header">
            <div className="flex align-y cart-header-title">
              {/**<IoCheckmarkCircle style={{ color: "green" }} />
              <h3>Added to Bag</h3>**/}
            </div>
            <button className="close-button" title="close" onClick={toggleCart}><IoClose /></button>
          </div>
          <div className="cart-items">
            {cartItems.length === 0 ? 
            <div>
              <p>No Cart Item(s)</p>
            </div>: ''  
          }
            {cartItems.map(item => (
              <div key={item._id} className="cart-item">
                <Image
                  src={item.images[0].url} 
                  alt={item.name} 
                  width={80} 
                  height={80} 
                  objectFit="cover"
                />
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.category}</p>
                  <p>Quantity {item.quantity}</p>
                  <h5>${item.price}</h5>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-actions">
            <button className="view-bag-button" onClick={toggleCart}><Link href="/view-bag">View Bag ({cartItems.length})</Link></button>
            <Link href="/checkout/auth"><button className="checkout-button">Checkout</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
