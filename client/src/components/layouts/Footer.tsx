import React from 'react';
import {FaFacebook, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa';
import Link from "next/link";
import FooterSVG from "./FooterSVG"
import './Footer.css';

function Footer() {
 return (
  <footer className="footer">
  <div className="footer-container">
    <div>
      <div className="footer-head flex">
          <h3 className="footer-title"><Link href="/"><FooterSVG /></Link></h3>
        <div className="footer-icons">
          <FaFacebook />
          <FaTwitter />
          <FaYoutube />
          <FaInstagram />
        </div>
      </div>
    </div>
    <div className="footer-grid">
      <div>
        <h4 className="footer-heading">EXPLORE BLENDKO</h4>
        <ul className="footer-links">
          <li><Link href="/about-us">About Us</Link></li>
          <li><Link href="/careers">Careers</Link></li>
          <li><Link href="/press">Press</Link></li>
          <li><Link href="/sustainability">Sustainability</Link></li>
          <li><Link href="/reviews">Reviews</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="footer-heading">CUSTOMER SERVICE</h4>
        <ul className="footer-links">
          <li><Link href="/contact-us">Contact Us</Link></li>
          <li><Link href="/returns">Returns</Link></li>
          <li><Link href="/careers">Careers</Link></li>
          <li><Link href="/faq">FAQs</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="footer-heading">CUSTOMISATION</h4>
        <ul className="footer-links">
          <li><Link href="">Design Your Own</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="footer-heading">STAY CONNECTED</h4>
        <ul className="footer-links">
          <li>Email</li>
          <li>Facebook</li>
          <li>X (Formerly Twitter)</li>
          <li>Instagram</li>
          <li>LinkedIn</li>
        </ul>
      </div>
      <div>
        <h4 className="footer-heading">HELP</h4>
        <ul className="footer-links">
          <li>Get Help</li>
          <li>Order Status</li>
          <li>Shipping and Delivery</li>
          <li>Returns</li>
        </ul>
      </div>
    </div>
  </div>
  <div>
    <ul className="footer-container footer-legal">
      <li>Legal</li>
      <li>Terms of Service</li>
      <li>Privacy Policy</li>
      <li>Cookie Policy</li>
      <li>Accessibility Statement</li>
    </ul>
  </div>
</footer>)
}

export default Footer;