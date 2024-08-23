import styles from './styles.module.css';

import useSelectOption from '@/utils/hooks/useSelectOption';
import Accordion from '@/components/ui/accordion/Accordion';
import { ChevronIcon } from '../../../../public/svg/icon';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

function SizeFilter() {
  const { handleSelect, selectedOptions } = useSelectOption();

  return (
    <Accordion
      className={styles.sidebar_filter}
      head={
        <>
          <span>Sizes</span>

          <ChevronIcon />
        </>
      }
      body={
        <ul className={`flex ${styles.options} ${styles.list_option}`}>
          {sizes.map((size) => (
            <li key={size}>
              <button
                type="button"
                onClick={() => handleSelect(size)}
                className={`${
                  selectedOptions.includes(size) ? styles.selected : ''
                }`}
              >
                {size}
              </button>
            </li>
          ))}
        </ul>
      }
    />
  );
}

export default SizeFilter;
