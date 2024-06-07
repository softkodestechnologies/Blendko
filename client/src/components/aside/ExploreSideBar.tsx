import Link from 'next/link';
import './ExploreSideBar.css';

function ExploreSideBar() {
    return (
        <div className="sidebar">
          <h2 className="sidebar_title">EXPLORE SITE</h2>
          <ul>
            <li>
              <Link href="#" className="sidebar_link">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="sidebar_link">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="sidebar_link">
                Authenticity
              </Link>
            </li>
            <li>
              <Link href="#" className="sidebar_link">
                Reviews
              </Link>
            </li>
          </ul>
          <h2 className="sidebar_title">CUSTOMER SERVICE</h2>
          <ul>
            <li>
              <Link href="#" className="sidebar_link">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="#" className="sidebar_link">
                Returns
              </Link>
            </li>
            <li>
              <Link href="#" className="sidebar_link">
                FAQs
              </Link>
            </li>
          </ul>
          <h2 className="sidebar_title">CUSTOMIZATION</h2>
          <ul>
            <li>
              <Link href="#" className="sidebar_link">
                Design Your Own
              </Link>
            </li>
          </ul>
          <h2 className="sidebar-title sidebar-section">LEGAL</h2>
          <ul>
            <li>
              <Link href="#" className="sidebar_link">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#" className="sidebar_link">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="sidebar_link">
                Accessibility Statement
              </Link>
            </li>
          </ul>
        </div>
    )
}

export default ExploreSideBar;