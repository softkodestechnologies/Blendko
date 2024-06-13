import React from 'react';
import Image from 'next/image';
import './ShopByCategory.css';

const ShopByCategory: React.FC = () => {
  return (
    <section className="section">
      <h2 className="title">Shop by <br className="title-break"/> Category</h2>
      <div className="imageContainer">
        <div className="imageWrapper jeans">
          <Image src="/Jeans.png" alt="Jeans" width={300} height={400} className="image" />
          <h3 className="label">Jeans</h3>
        </div>
        <div className="imageWrapper jacket">
          <Image src="/Jacket.png" alt="Jacket" width={300} height={400} className="image" />
          <h3 className="label">Jacket</h3>
        </div>
        <div className="imageWrapper trousers">
          <Image src="/Trousers.png" alt="Trousers" width={300} height={400} className="image" />
          <h3 className="label">Trousers</h3>
        </div>
      </div>
      <div className="customizeSection">
        <h3>Tailor Your Style, Your Way</h3>
        <h5>Discover Limitless Possibilities with Our Customization Options</h5>
        <p>Transform your wardrobe into a personalized masterpiece with our intuitive customization tools. From selecting fabrics to adding personal touches, embark on a journey of self-expression and style refinement. Get started now and craft the outfit of your dreams!</p>
        <button className="main-button">Start Customising</button>
      </div>
    </section>
  );
};

export default ShopByCategory;

