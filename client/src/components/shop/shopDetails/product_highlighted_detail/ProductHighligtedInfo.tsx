'use client';
import { useState } from 'react';

import styles from './productHighlightedDetail.module.css';

import Accordion from '@/components/ui/accordion/Accordion';
import { ChevronDown } from '../../../../../public/svg/icon';

const extraInfo = [
  {
    title: 'Free Delivery and Returns',
    content: 'Get free delivery and returns on all orders.',
  },
  {
    title: 'How This Was Made',
    content: "Information about the product's manufacturing process.",
  },
  {
    title: 'Reviews (12)',
    content: 'Review content',
  },
  {
    title: 'Shipping and Returns',
    content: 'Shipping and Returns content',
  },
];

function ProductHighligtedInfo({ details }: any) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <ul>
      {extraInfo.map((info, index) => (
        <li key={index}>
          <Accordion
            toggleOpen={activeIndex === index}
            setToggleOpen={() => handleToggle(index)}
            className={`${styles.extra_info}`}
            head={
              <>
                <h3>{info.title}</h3>

                <ChevronDown />
              </>
            }
            body={<p className={`${styles.content}`}>{info.content}</p>}
          />
        </li>
      ))}
    </ul>
  );
}

export default ProductHighligtedInfo;
