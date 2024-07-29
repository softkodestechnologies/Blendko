import React from 'react';
import  './LoadingSkeleton.css';

const LoadingSkeleton = () => {
  return (
    <div className="skeleton-container">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="skeleton-item">
          <div className="image-skeleton"></div>
          <div className="text-skeleton"></div>
          <div className="price-skeleton"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
