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
    url: '/customize',
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
      { title: 'Contact Us', url: '/contact-us' },
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
      { title: 'Privacy Policy', url: '/privacy-policy' },
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

export const policy = [
  {
    heading: `Scope of this Privacy Policy`,
    content: [
      `This Privacy Policy (“Policy”) applies to the personal information that Nike, Inc. collects and processes when you interact with us as a customer, including when you interact with our websites, digital experiences, mobile apps, stores, online or offline events, promotions, or one of our other products or services, all of which are part of Nike’s “Platform” and direct to this Privacy Policy. This Policy also applies to the personal information that Nike processes when you subscribe to receive marketing communications from us, communicate with us or engage with us via our Platform, or participate in contests, sweepstakes, and surveys.`,
      `Nike may provide you with additional privacy notices that will apply to certain personal information collected and processed by us. For example, we may provide additional notice to provide more specific information if you choose to take advantage of a particular partner promotion.  This Policy does not apply to your personal information if you work for us as an employee or independent contractor, apply for a job at Nike, or interact with third party partners or websites that are linked to or accessible from Nike’s Platform.`,
    ],
    subcontent: [],
  },
  {
    heading: `Personal Information We Collect`,
    content: [
      `Blendko collects personal information directly from you, automatically when you use our Platform or interact with us, and from third parties. The definition of “personal information” depends on the applicable law of where you reside. For purposes of this policy, “personal information” means information that identifies, relates to, describes, is reasonably capable of being associated with, or could reasonably be linked, directly or indirectly, to an individual or household.  This does not include aggregated or de-identified information that is maintained in a form that cannot reasonably be used to infer information about, or otherwise be linked to, a particular individual or household.`,
    ],
    subcontent: [
      {
        heading: `Personal Information Collected Directly from You.`,
        content: `We ask you for certain personal information to provide you with the products or services you request. The personal information we collect from you depends on how you interact with us or use our Platform. This personal information includes your`,
        list: [
          `Identifiers. We collect certain personal information from you, such as your name, telephone number, email address, date of birth, password, and other identifiers, as well as any personal and demographic information that you share with us, such as gender, hometown, photos, and images you provide to us or post to your profile, or product preferences. When you make a purchase, we collect your payment or credit card information and shipping and billing address.`,
          `Commercial Information. We collect information about your purchases, favorites, and items that you view or add to your cart.`,
          `Communications. When you communicate with us, we collect your contact details and keep a record of the communications, as well as our responses. We also maintain records of information that you post on our social media channels, and information you provide to us related to any customer support requests.`,
          `Physical Characteristics. We collect information on your physical characteristics, including weight, height, and body measurements (such as estimated stride and shoe/foot measurements or apparel size).`,
          `Fitness and Activity Information. We may collect fitness activity information provided by you or generated through your use of our Platform, such as time, duration, distance, location, calorie count, resting heart rate and pace/stride. We may also collect information from your device’s health and fitness repository (such as Apple’s HealthKit or Android’s Google Fit).`,
          `Sweepstakes, Contests and Promotions. If you participate in sweepstakes, contests, and promotions that we offer, we may collect your personal information and other registration information related to contests, sweepstakes, and promotions`,
          `Events Information. We also collect personal information related to your participation in our events. For example, if you register for or attend an event that we host or sponsor, we may collect information related to your registration for and participation in such event`,
        ],
      },
      {
        heading: `Personal Information We Derive or Collect Automatically.`,
        content: `We and our third-party service providers automatically collect personal information related to your use of our Platform and interactions with us and others, including when you enable certain features within our Platform. This information includes:`,
        list: [
          `Location information. We may collect or derive approximate or precise location information about you. How we collect this information depends on how you use and interact with our Platform and your device settings. For example, we may derive your general location through your IP address.  We may collect your precise geolocation (GPS) information from your device or browser, including with your permission available via your device or browser. You may turn off precise location information sharing through your device settings.`,
          `Device information. When you interact with our Platform, we collect technical information about your device including your IP address; unique identifiers; unique device identifier and device type; domain, browser type, version, and language; operating system and system settings; general location information and time zone; and similar device and usage information.`,
          `Online Activity and Browsing Information. We use cookies, log files, pixel tags, software development kits (“SDKs”) and other tracking technologies to automatically collect information about your interaction with our websites and apps and communications you receive from us. This information includes links clicked, page views, purchases, searches, features used, items viewed, time spent within the Platform, information uploaded, items you add to your cart and your interactions with others within the Platform. For more information, see About Cookies and Similar Technologies below.`,
          `Audio, visual and other electronic data. We may collect audio, visual, and other electronic data, such as through CCTV footage from our stores, offices or premises, and call recordings.`,
          `Sensor and Movement Data. When you grant us access, we may collect information about you from your device’s sensors, including heart rate, and information about your movement and travel patterns from your device’s accelerometer.`,
          `Photos, Contacts, and Calendar information. When you grant us access, we may collect your photos, contacts and calendar information stored on your device.`,
          `Inferences. To personalize your experience on the Platform, we may draw inferences using your personal information, to create a profile reflecting your interests, preferences, and characteristics.`,
        ],
      },
    ],
  },
];

import {
  ContactIcon1,
  ContactIcon2,
  ContactIcon3,
  ContactIcon4,
} from '../../../public/svg/icon';

export const contactCards = [
  {
    icon: ContactIcon1(),
    title: 'Products & Orders',
    description: ['8 am - 11 pm PT', '7 days a week'],
  },
  {
    icon: ContactIcon2(),
    title: 'Products & Orders',
    description: ['1-903-938-2343', '7 days a week', '8 am - 11 pm PT'],
  },
  {
    icon: ContactIcon3(),
    title: 'NRC, NTC & SWOOSH',
    description: [
      '1-903-938-2343',
      '7 days a week',
      '8 am - 11 pm PT',
      'Mon - Fri',
    ],
  },
  {
    icon: ContactIcon3(),
    title: 'NRC, NTC & SWOOSH',
    description: [
      '1-903-938-2343',
      '7 days a week',
      '8 am - 11 pm PT',
      'Mon - Fri',
    ],
  },
  {
    icon: ContactIcon4(),
    title: 'Find a Store',
    description: [],
  },
];

export const careerNavLinks = [
  {
    title: 'Brand',
    children: ['Brand 1', 'Brand 2', 'Brand 3'],
  },
  {
    title: 'Position Type',
    children: ['Position 1', 'Position 2', 'Position 3'],
  },
  {
    title: 'Career Area',
    children: ['Career 1', 'Career 2', 'Career 3'],
  },
  {
    title: 'Location',
    children: ['Location 1', 'Location 2', 'Location 3'],
  },
];
