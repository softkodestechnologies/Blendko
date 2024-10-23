import Link from 'next/link';

import styles from './footer.module.css';

import {
  FooterLogo,
  XIcon,
  FacebookIcon,
  YoutubeIcon,
  InstagramIcon,
} from '../../../../public/svg/icon';
import { footerLinks } from '@/utils/data/dummy';

function Footer() {
  return (
    <footer className={`${styles.footer}`}>
      <div className={`${styles.footerContainer}`}>
        <div className={`flex align-y space-between ${styles.footerTop}`}>
          <Link href="/">
            <FooterLogo className={`full-height full-width`} />
          </Link>

          <ul className={`flex align-y ${styles.linkGroup}`}>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.twitter.com/"
                className={`flex align-y align-x`}
              >
                <XIcon />
              </a>
            </li>

            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/"
                className={`flex align-y align-x`}
              >
                <FacebookIcon />
              </a>
            </li>

            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/"
                className={`flex align-y align-x`}
              >
                <YoutubeIcon />
              </a>
            </li>

            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/"
                className={`flex align-y align-x`}
              >
                <InstagramIcon />
              </a>
            </li>
          </ul>
        </div>

        <div className={`grid space-between ${styles.footerLinks}`}>
          <div>
            <h3>Explore Bienko</h3>

            <ul className={`flex flex-col`}>
              {footerLinks.explore_blenko.map((link, index) => (
                <li key={index}>
                  <Link href={link.url}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Customer Service</h3>

            <ul className={`flex flex-col`}>
              {footerLinks.customer_services.map((link, index) => (
                <li key={index}>
                  <Link href={link.url}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${styles.customization}`}>
            <h3>Customisation</h3>

            <ul className={`flex flex-col`}>
              {footerLinks.customisation.map((link, index) => (
                <li key={index}>
                  <Link href={link.url}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Stay Connected</h3>

            <ul className={`flex flex-col`}>
              {footerLinks.stay_connected.map((link, index) => (
                <li key={index}>
                  <Link href={link.url}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Help</h3>

            <ul className={`flex flex-col`}>
              {footerLinks.help.map((link, index) => (
                <li key={index}>
                  <Link href={link.url}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`flex ${styles.bottom}`}>
          <ul className={`flex`}>
            <li>Legal:</li>
            {footerLinks.bottom.map((link, index) => (
              <li key={index}>
                <Link href={link.url}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
