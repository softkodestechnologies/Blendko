import React from 'react';
import Link from 'next/link';
import './ExploreMobileSideBar.css';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function ExploreMobileSideBar({ isOpen, onClose }: MobileSidebarProps) {
  return (
    <>
      <div className={`mobile-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Explore</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <hr />

        <h3 className="section-title">EXPLORE BLENDKO</h3>
        <ul className="sidebar-list">
          <li><label><input type="checkbox" /> About Us</label></li>
          <li><label><input type="checkbox" /> Careers</label></li>
          <li><label><input type="checkbox" /> Authenticity</label></li>
          <li><label><input type="checkbox" /> Reviews</label></li>
        </ul>

        <hr className="sidebar-divider" />

        <h3 className="section-title">CUSTOMER SERVICE</h3>
        <ul className="sidebar-list">
          <li><label><input type="checkbox" /> Contact Us</label></li>
          <li><label><input type="checkbox" /> Returns</label></li>
          <li><label><input type="checkbox" /> FAQs</label></li>
        </ul>

        <hr className="sidebar-divider" />

        <h3 className="section-title">CUSTOMIZATION</h3>
        <ul className="sidebar-list">
          <li><label>Design Your Own</label></li>
        </ul>

        <hr className="sidebar-divider" />

        <h3 className="section-title">LEGAL</h3>
        <ul className="sidebar-list">
          <li><label>Terms Of Service</label></li>
          <li><label>Privacy Policy</label></li>
          <li><label>Accessibility Statement</label></li>
        </ul>
      </div>
      {isOpen && <div className="overlay" onClick={onClose}></div>}
    </>
  );
}

export default ExploreMobileSideBar;