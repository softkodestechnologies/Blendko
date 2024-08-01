import React from 'react';
import './HamburgerMenu.css';

const HamburgerMenu = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
    onClick={onClick}
      className="hamburger-menu"
      aria-label="Toggle Navigation"
    >
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </button>
  );
};

export default HamburgerMenu;
