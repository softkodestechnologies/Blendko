import React from 'react';
import {FaFacebook, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa';
import Link from "next/link";
import FooterSVG from "./FooterSVG";
import { CgChevronRight } from 'react-icons/cg';
import './Footer.css';

function Footer() {
 return (
  <footer className="footer">
  <div className="footer-container">
    <div>
      <div className="footer-head flex">
          <h3 className="footer-title"><Link href="/"><FooterSVG /></Link></h3>
        <div className="footer-icons">
          <a target="_blank" rel="noopener noreferrer" href="https://facebook.com/blendkoShop" aria-label="follow us on Facebook"><FaFacebook /></a>

          <a target="_blank" rel="noopener noreferrer" href="https://x.com/blendkoShop" aria-label="follow us on X"><FaTwitter /></a>

          <a target="_blank" rel="noopener noreferrer" href="https://youtube.com/blendkoShop" aria-label="follow us on Youtube"><FaYoutube /></a>

          <a target="_blank" rel="noopener noreferrer" href="https://instagram.com/blendkoShop" aria-label="follow us on Instagram"><FaInstagram /></a>
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
          <li><Link href="/customize">Design Your Own</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="footer-heading">STAY CONNECTED</h4>
        <ul className="footer-links">
            {/* <li className="email-input-container">
              <input className="email-input" type="text" placeholder="Email"/>
              <span className="arrow"><CgChevronRight /></span>
            </li> */}

            <li><a target="_blank" rel="noopener noreferrer" href="https://facebook.com/blendkoShop" aria-label="follow us on Facebook">Facebook</a></li>
            
          <li><a target="_blank" rel="noopener noreferrer" href="https://x.com/blendkoShop" aria-label="follow us on X">X (Formerly Twitter)</a></li>

          <li><a target="_blank" rel="noopener noreferrer" href="https://instagram.com/blendkoShop" aria-label="follow us on Instagram">Instagram</a></li>

          <li><a target="_blank" rel="noopener noreferrer" href="https://linkedin.com/blendkoShop" aria-label="follow us on LinkedIn">LinkedIn</a></li>
        </ul>
      </div>
      <div>
        <h4 className="footer-heading">HELP</h4>
        <ul className="footer-links">
          <li><Link href="/help">Get Help</Link></li>
          <li><Link href="/order-status">Order Status</Link></li>
          <li><Link href="/shipping">Shipping and Delivery</Link></li>
          <li><Link href="/returns">Returns</Link></li>
        </ul>
      </div>
    </div>
  </div>
  <div>
    <ul className="footer-container footer-legal">
      <li><Link href="/legal">Legal</Link></li>
      <li><Link href="/terms">Terms of Service</Link></li>
      <li><Link href="/privacy-policy">Privacy Policy</Link></li>
      <li><Link href="/cookie-policy">Cookie Policy</Link></li>
      <li><Link href="/accessibility-statement">Accessibility Statement</Link></li>
    </ul>
  </div>
</footer>)
}

export default Footer;