export const navLinks = [
  {
    title: 'Home',
    url: '/',
    subMenu: [],
  },
  {
    title: 'New Arrival',
    url: '/shop',
    subMenu: [],
  },
  {
    title: 'Categories',
    url: '',
    subMenu: [
      {
        title: 'Bags',
        url: '/shop?category=Bags',
      },
      {
        title: 'Kids',
        url: '/shop?category=Kids',
      },
      {
        title: 'Jewelries',
        url: '/shop?category=Jewelries',
      },
      {
        title: 'Men’s Fashion',
        url: '/shop?category=Men’s Fashion',
      },
      {
        title: 'Women’s Fashion',
        url: '/shop?category=Women’s Fashion',
      },
    ],
  },
  {
    title: 'Customization',
    url: '/shop',
    subMenu: [],
  },
];

import jeans from '../../../public/Jeans.png';
import jacket from '../../../public/Jacket.png';
import trousers from '../../../public/Trousers.png';

export const categories = [
  {
    image: jeans,
    title: 'Jeans',
    url: '/shop?category=Jeans',
  },
  {
    image: jacket,
    title: 'Jacket',
    url: '/shop?category=Jacket',
  },
  {
    image: trousers,
    title: 'Trousers',
    url: '/shop?category=Trousers',
  },
];

import slide1 from '../../../public/slide1.jpeg';
import slide2 from '../../../public/slide2.png';
import slide3 from '../../../public/slide3.png';
import slide4 from '../../../public/slide4.png';

export const slides = [
  {
    id: 0,
    image: slide1,
    price: '2,304',
    title: 'Croc-Effect Medusa ‘98 small tote bag',
  },
  {
    id: 1,
    image: slide2,
    price: '921',
    title: 'Medusa ‘98 small Tote Bag',
  },
  {
    id: 2,
    image: slide3,
    price: '2,304',
    title: 'Croc-Effect Medusa ‘98 small tote bag',
  },
  {
    id: 3,
    image: slide4,
    price: '2,304',
    title: 'Croc-Effect Medusa ‘98 small tote bag',
  },
];

export const footerLinks = {
  explore_blenko: [
    { title: 'About Us', url: '/about-us' },
    { title: 'Careers', url: '/careers' },
    { title: 'News', url: '/news' },
    { title: 'Reviews', url: '/reviews' },
  ],
  customer_services: [
    { title: 'Contact Us', url: '/contact' },
    { title: 'Returns', url: '/returns' },
    { title: 'FAQs', url: '/faq' },
  ],
  customisation: [{ title: 'Design Your Own', url: '/customize' }],
  stay_connected: [
    { title: 'Facebook', url: 'https://facebook.com' },
    { title: 'X(Formerly Twitter)', url: 'https://twitter.com' },
    { title: 'Instagram', url: 'https://instagram.com' },
    { title: 'LinkedIn', url: 'https://linkedin.com' },
  ],
  help: [
    { title: 'Get Help', url: '/help' },
    { title: 'Shipping and Delivery', url: '/shipping' },
    { title: 'Returns', url: '/returns' },
    { title: 'Payment Options', url: '/payment' },
  ],
  bottom: [
    { title: 'Legal', url: '/legal' },
    { title: 'Terms of Service', url: '/terms' },
    { title: 'Privacy Policy', url: '/privacy' },
    { title: 'Cookie Policy', url: '/' },
    { title: 'Accessibility Statement', url: '/accessibility' },
  ],
};

export const resourceSidebarLinks = [
  {
    header: 'EXPLORE BLENDKO',
    links: [
      { title: 'About Us', url: '/about-us' },
      { title: 'Careers', url: '/careers' },
      { title: 'Authenticity', url: '/authenticity' },
      { title: 'Reviews', url: '/reviews' },
    ],
  },
  {
    header: 'CUSTOMER SERVICE',
    links: [
      { title: 'Contact Us', url: '/contact' },
      { title: 'Returns', url: '/returns' },
      { title: 'FAQs', url: '/faq' },
    ],
  },
  {
    header: 'CUSTOMIZATION',
    links: [{ title: 'Design Your Own', url: '/customize' }],
  },
  {
    header: 'LEGAL',
    links: [
      { title: 'Terms of Service', url: '/terms' },
      { title: 'Privacy Policy', url: '/privacy' },
      { title: 'Accessibility Statement', url: '/accessibility' },
    ],
  },
];
