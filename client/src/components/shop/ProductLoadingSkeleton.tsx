import React from 'react';
import  './ProductLoadingSkeleton.css'; // Import the CSS module

const ProductLoadingSkeleton: React.FC = () => {
  return (
    <div className="container">
      <nav className="breadcrumb">
        <div className="skeletonBreadcrumb"></div>
      </nav>
      <div className="productPage">
        <div className="imageGallery">
          <div className="mainImage">
            <div className="skeletonImage"></div>
          </div>
          <div className="thumbnailImages">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="skeletonThumbnail"></div>
            ))}
          </div>
        </div>
        <div className="productDetails">
          <div className="skeletonTitle"></div>
          <div className="skeletonRating"></div>
          <div className="skeletonPrice">
            <div className="skeletonCurrentPrice"></div>
            <div className="skeletonOriginalPrice"></div>
          </div>
          <div className="skeletonDescription"></div>
          <div className="options">
            <div className="skeletonColors">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="skeletonColorButton"></div>
              ))}
            </div>
            <div className="skeletonSizes">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="skeletonSizeButton"></div>
              ))}
            </div>
            <div className="skeletonQuantity">
              <div className="skeletonQuantityButton"></div>
              <div className="skeletonQuantityNumber"></div>
              <div className="skeletonQuantityButton"></div>
            </div>
          </div>
          <div className="skeletonAddToCartButton"></div>
          <div className="extraDetails">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="skeletonExtraDetail"></div>
            ))}
          </div>
        </div>
      </div>
      <div className="recommendations">
        <div className="skeletonRecommendationTitle"></div>
        <div className="recommendationItems">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="skeletonRecommendationItem">
              <div className="skeletonRecommendationImage"></div>
              <div className="skeletonRecommendationDetails"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductLoadingSkeleton;
