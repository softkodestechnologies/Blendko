import React from 'react';
import './viewBag.css';

interface ViewBagProps {
  items: Array<{
    name: string;
    price: number;
    size: string;
    color: string;
  }>;
  total: number;
  promoCode?: string;
}

const ViewBag: React.FC<ViewBagProps> = ({ items, total, promoCode }) => {
  return (
    <div className="container">
      <div className="bagItems">
        <h2>Bag</h2>
        {items.map((item, index) => (
          <div key={index} className="item">
            <p>{item.name}</p>
            <p>${item.price.toFixed(2)}</p>
            <p>Size: {item.size}</p>
            <p>Color: {item.color}</p>
          </div>
        ))}
      </div>
      <div className="summary">
        <h2>Summary</h2>
        <div>
          <label>
            Do you have a Promo Code?
            <input type="text" value={promoCode || ''} placeholder="Enter promo code" />
          </label>
        </div>
        <p>Subtotal: ${total.toFixed(2)}</p>
        <p>Estimated delivery &amp; handling: Free</p>
        <p>Total: ${total.toFixed(2)}</p>
        <button className="checkoutButton">Checkout</button>
      </div>
      <div className="recommendations">
        <h2>You might also like</h2>
        {/*PEMINDER: Add code later to render recommended products */}
      </div>
    </div>
  );
};

export default ViewBag;