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

export const reviews = [
  {
    bold: 'Blendko Consumer Ratings and Reviews',
    text: `Terms of Service These Terms of Service govern your conduct associated with the Customer Ratings and Reviews service offered by Blendko (the "CRR Service"). Your conduct is also subject to Blendko's online Terms of Use and Privacy Policy. When you submit content for posting on our site, you permit us to post your submission with your screenname, city, and state.`,
    list: [],
  },
  {
    bold: '',
    text: `By submitting any content to Blendko, you represent and warrant that:`,
    list: [
      'You are the sole author and owner of the intellectual property rights thereto;',
      `All "moral rights" that you may have in such content have been voluntarily waived by you;`,
      'All content that you post is accurate; you are at least 13 years old;',
      `And that use of the content you supply does not violate these Terms of Service and will not cause injury to any person or entity.`,
    ],
  },
  {
    bold: '',
    text: `You further agree and warrant that you shall not submit any content:`,
    list: [
      `That is known by you to be false, inaccurate, or misleading;`,
      `That infringes any third party's copyright, patent, trademark, trade secret, or other proprietary rights or rights of publicity or privacy;`,
      `That violates any law, statute, ordinance, or regulation (including, but not limited to, those governing export control, consumer protection, unfair competition, anti-discrimination, or false advertising);`,
      `That is, or may reasonably be considered to be, defamatory, libelous, hateful, racially or religiously biased or offensive, unlawfully threatening or unlawfully harassing to any individual, partnership, or corporation;`,
      `For which you were compensated or granted any consideration by any third party; that includes any information that references other websites, addresses, email addresses, contact information, or phone numbers;`,
      `Or that contains any computer viruses, worms, or other potentially damaging computer programs or files. `,
    ],
  },
  {
    bold: '',
    text: `You agree to indemnify and hold Blendko (and its officers, directors, agents, subsidiaries, joint ventures, employees, and third-party service providers, including but not limited to Bazaarvoice, Inc.), harmless from all claims, demands, and damages (actual and consequential) of every kind and nature, known and unknown including reasonable attorneys' fees, arising out of a breach of your representations and warranties set forth above, or your violation of any law or the rights of a third party.`,
    list: [],
  },
  {
    bold: '',
    text: `For any content that you submit, you grant Blendko, Inc., including its affiliates and subsidiaries, a perpetual, irrevocable, royalty-free, transferable right and license to use, copy, modify, delete in its entirety, adapt, publish, translate, create derivative works from and/or sell and/or distribute such content and/or incorporate such content into any form, medium, product, or technology throughout the world without compensation to you.`,
    list: [],
  },
  {
    bold: '',
    text: `All content that you submit may be used at Blendko's sole discretion. Blendko reserves the right to change, condense, or delete any content on Blendko's website that Blendko deems, in its sole discretion, to violate the content guidelines or any other provision of these Terms of Service. Blendko does not guarantee that you will have any recourse to edit or delete any content you have submitted. Ratings and written comments are generally posted within two to four business days`,
    list: [],
  },
  {
    bold: '',
    text: `However, Blendko reserves the right to remove or to refuse to post any submission for any reason. You acknowledge that you, not Blendko, are responsible for the contents of your submission. None of the content that you submit shall be subject to any obligation of confidence on the part of Blendko, its agents, subsidiaries, affiliates, partners, or third-party service providers and their respective directors, officers, and employees.`,
    list: [],
  },
  {
    bold: '',
    text: `By submitting your email address in connection with your rating and review, you agree that Blendko and its third-party service providers may use your email address to contact you about the status of your review and other administrative purposes.`,
    list: [],
  },
];
