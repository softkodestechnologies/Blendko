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

interface CollectionFilterProps {
  handleCheckboxChange: (key: string, value: string[]) => void;
  selectedCollections: string[];
}

function CollectionFilter({ handleCheckboxChange, selectedCollections }: CollectionFilterProps) {
  const handleSelect = (item: string) => {
    const updatedCollections = selectedCollections.includes(item)
      ? selectedCollections.filter((i) => i !== item)
      : [...selectedCollections, item];
    handleCheckboxChange('fashion_collection', updatedCollections);
  };

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
                className={`${selectedCollections.includes(item) ? styles.selected : ''}`}
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
