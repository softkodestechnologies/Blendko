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
