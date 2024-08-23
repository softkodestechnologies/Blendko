import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import styles from './styles.module.css';

import Accordion from '@/components/ui/accordion/Accordion';
import { ChevronIcon, CheckMark } from '../../../../public/svg/icon';

function PriceSlider() {
  return (
    <Accordion
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
            keyboard
            max={1000}
            // defaultValue={[Number(priceGTE) || 300, Number(priceLTE) || 600]}
            defaultValue={[300, 600]}
            className={`${styles.slider}`}
            onChangeComplete={(value) => console.log(value)}
            // onAfterChange={(value) => handlePriceRange(value)}
            styles={{
              handle: { backgroundColor: '#000', border: 'none' },
              track: { backgroundColor: '#000' },
            }}
            ariaLabelForHandle={['Lower price limit', 'Upper price limit']}
          />
        </div>
      }
    />
  );
}

export default PriceSlider;
