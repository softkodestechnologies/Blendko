// components/LoadingSkeleton.tsx
import React from 'react';
import  './LoadingSkeleton.css';

const LoadingSkeleton = () => {
  return (
    <div className="skeletonContainer">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="skeletonItem">
          <div className="imageSkeleton"></div>
          <div className="textSkeleton"></div>
          <div className="priceSkeleton"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
