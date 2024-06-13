import Image from 'next/image';
import Link from 'next/link';
import './Jumbotron.css';

const Jumbotron = () => {
  return (
    <div className="sectionContainer">
      <div className="topSection">
        <div className="discountText">50<span className="discountTextPercentage">%</span></div>
        <div className="section-image-container">
            {/* Line and Annotations */}
            <div className="annotation line1-parent">
                <div className="lineImage line1"></div>
            </div>
            <div className="annotation line2-parent">
                <div className="lineImage line2"></div>
            </div>
            <div className="annotation line3-parent">
                <div className="lineImage line3"></div>
            </div>
            <div className="annotation line4-parent">
                <div className="lineImage line4"></div>
            </div>
            <div className="annotation line5-parent">
                <div className="lineImage line5"></div>
            </div>
            <div className="annotation discount-now-parent">
                <p>Discount Now</p>
            </div>
            <Image src="/blendko-lady.png" alt="Woman" width={500} height={800} className="womanImage" />
        </div>

        <div className="main-banner-container">
          <div className="flex flex-col ">
            <div className="container main-banner-text">
              <h1 className="main-banner-text-main">CAMERO BOOST WINTER <br/> JACKET GREY</h1>
              <button className="main-button">Explore More</button>
            </div>
          </div>
        </div>
      </div>
      <div className="bottomSection">
        {/* Add the bottom section content here */}
        <div className="main-banner-img">
          <div className="main-banner-img1 flex center">
            <div className='main-banner-text-center'>
                <h2>Fashion & Accessories</h2>
                <p><Link href="/">Discover</Link></p>
            </div>
          </div>
          <div className="flex flex-col center main-banner-hidden">
            <h2>Explore Our Latest Collections</h2>
            <p>Start exploring now and find your signature style!</p>
            <button className="main-button btn-shop"><Link href="/shop">Shop</Link></button>
          </div>
          <div className="main-banner-img2 flex center">
            <div className='main-banner-text-center'>
                <h2>Fashion & Accessories</h2>
                <p><Link href="/">Discover</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;

