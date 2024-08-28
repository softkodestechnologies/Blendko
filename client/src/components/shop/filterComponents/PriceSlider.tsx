import Slider from 'rc-slider';
import { useState } from 'react';

import 'rc-slider/assets/index.css';
import styles from './styles.module.css';

import Accordion from '@/components/ui/accordion/Accordion';
import { ChevronIcon } from '../../../../public/svg/icon';

function PriceSlider() {
  const [expanded, setExpanded] = useState(true);
  const [priceRange, setPriceRange] = useState([200, 800]);

  const handleSliderChange = (value: any) => {
    setPriceRange(value);
  };

  return (
    <Accordion
      toggleOpen={expanded}
      setToggleOpen={() => setExpanded(!expanded)}
      className={`${styles.sidebar_filter}`}
      head={
        <>
          <span>Price</span>

          <ChevronIcon />
        </>
      }
      body={
        <div className={`${styles.price_filter}`}>
          <Slider
            range
            min={0}
            max={1000}
            defaultValue={priceRange}
            className={`${styles.slider}`}
            onChange={handleSliderChange}
            styles={{
              handle: { backgroundColor: '#000', border: 'none' },
              track: { backgroundColor: '#000' },
              
            }}
            ariaLabelForHandle={['Lower price limit', 'Upper price limit']}
          />
          <div
            className={`flex full-width space-between ${styles.price_labels}`}
          >
            <span style={{ left: `${(priceRange[0] / 1000) * 100}%` }}>
              ${priceRange[0]}
            </span>

            <span style={{ left: `${(priceRange[1] / 1000) * 100}%` }}>
              ${priceRange[1]}
            </span>
          </div>
        </div>
      }
    />
  );
}

export default PriceSlider;
