import React from 'react';
import  './ProductLoadingSkeleton.css'; // Import the CSS module

const ProductLoadingSkeleton: React.FC = () => {
  return (
    <div className="container">
      <nav className="breadcrumb">
        <div className="skeleton-breadcrumb"></div>
      </nav>
      <div className="product-page">
        <div className="image-gallery">
          <div className="main-image">
            <div className="skeleton-image"></div>
          </div>
          <div className="thumbnailImages">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="skeleton-thumbnail"></div>
            ))}
          </div>
        </div>
        <div className="product-details">
          <div className="skeleton-title"></div>
          <div className="skeleton-rating"></div>
          <div className="skeleton-price">
            <div className="skeleton-current-price"></div>
            <div className="skeleton-original-price"></div>
          </div>
          <div className="skeleton-description"></div>
          <div className="options">
            <div className="skeleton-colors">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="skeleton-color-button"></div>
              ))}
            </div>
            <div className="skeleton-sizes">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="skeleton-size-button"></div>
              ))}
            </div>
            <div className="skeleton-quantity">
              <div className="skeleton-quantity-button"></div>
              <div className="skeleton-quantity-number"></div>
              <div className="skeleton-quantity-button"></div>
            </div>
          </div>
          <div className="skeleton-add-to-cart-button"></div>
          <div className="extra-details">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="skeleton-extra-detail"></div>
            ))}
          </div>
        </div>
      </div>
      <div className="recommendations">
        <div className="skeleton-recommendation-title"></div>
        <div className="recommendation-items">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="skeleton-recommendation-item">
              <div className="skeleton-recommendation-image"></div>
              <div className="skeleton-recommendation-details"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductLoadingSkeleton;
