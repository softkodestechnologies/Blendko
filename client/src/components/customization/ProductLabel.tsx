import React from 'react';

type ProductLabelProps = {
  text: string;
  position: { x: number; y: number };
};

const ProductLabel: React.FC<ProductLabelProps> = ({ text, position }) => (
  <div
    style={{
      position: 'absolute',
      left: `${position.x}px`,
      top: `${position.y}px`,
      pointerEvents: 'none',
    }}
  >
    <div
      style={{
        border: '1px solid black',
        padding: '2px 5px',
        backgroundColor: 'white',
        position: 'relative',
      }}
    >
      {text}
      <svg
        width="50"
        height="50"
        style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)', // Center the SVG horizontally
        }}
      >
        <line x1="0" y1="0" x2="25" y2="50" style={{ stroke: 'black', strokeWidth: 1 }} />
      </svg>
    </div>
  </div>
);

export default ProductLabel;


