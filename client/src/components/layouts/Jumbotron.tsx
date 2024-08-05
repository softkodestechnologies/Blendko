import Image from 'next/image';
import Link from 'next/link';
import './Jumbotron.css';

const Jumbotron = () => {
  return (
    <div className="section-container">
      <div className="top-section">
        <div className="discount-text">
          50<span className="discount-text-percentage">%</span>
        </div>
        <div className="section-image-container">
          {/* Line and Annotations */}
          <div className="annotation line1-parent">
            <div className="line-image line1"></div>
          </div>
          <div className="annotation line2-parent">
            <div className="line-image line2"></div>
          </div>
          <div className="annotation line3-parent">
            <div className="line-image line3"></div>
          </div>
          <div className="annotation line4-parent">
            <div className="line-image line4"></div>
          </div>
          <div className="annotation line5-parent">
            <div className="line-image line5"></div>
          </div>
          <div className="annotation discount-now-parent">
            <p>Discount Now</p>
          </div>
          <Image
            src="/blendko-lady.png"
            alt="Woman"
            width={500}
            height={800}
            className="woman-image"
          />
        </div>

        <div className="main-banner-container">
          <div className="flex flex-col">
            <div className="main-banner-text">
              <h1 className="main-banner-text-main">
                CAMERO BOOST WINTER <br /> JACKET GREY
              </h1>
              <button className="main-button">
                <span>Explore More</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-section">
        <div className="main-banner-img">
          <div className="main-banner-img1 flex center">
            <div className="main-banner-text-center">
              <h2>Fashion & Accessories</h2>
              <p>
                <Link href="/shop">Discover</Link>
              </p>
            </div>
          </div>
          <div className="flex flex-col center main-banner-hidden">
            <h2>Explore Our Latest Collections</h2>
            <p>Start exploring now and find your signature style!</p>
            <button className="main-button btn-shop">
              <Link href="/shop">
                <span>Shop</span>
              </Link>
            </button>
          </div>
          <div className="main-banner-img2 flex center">
            <div className="main-banner-text-center">
              <h2>Fashion & Accessories</h2>
              <p>
                <Link href="/shop">Discover</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
