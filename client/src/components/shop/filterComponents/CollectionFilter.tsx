import styles from './styles.module.css';

import useSelectOption from '@/utils/hooks/useSelectOption';
import Accordion from '@/components/ui/accordion/Accordion';
import { ChevronIcon } from '../../../../public/svg/icon';

const collection = [
  'Summer Collection',
  'Winter Collection',
  'Spring Collection',
  'Fall Collection',
];

function CollectionFilter() {
  const { handleSelect, selectedOptions } = useSelectOption();

  return (
    <Accordion
      className={styles.sidebar_filter}
      head={
        <>
          <span>Collection</span>

          <ChevronIcon />
        </>
      }
      body={
        <ul className={`flex ${styles.options} ${styles.list_option}`}>
          {collection.map((item) => (
            <li key={item}>
              <button
                type="button"
                onClick={() => handleSelect(item)}
                className={`${
                  selectedOptions.includes(item) ? styles.selected : ''
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      }
    />
  );
}

export default CollectionFilter;
