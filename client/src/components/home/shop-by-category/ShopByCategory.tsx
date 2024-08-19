import Link from 'next/link';
import Image from 'next/image';

import styles from './shop-by-category.module.css';

import { categories } from '@/utils/data/dummy';
import { LinkArrow } from '../../../../public/svg/icon';

function ShopByCategory() {
  return (
    <section className={`section_container`}>
      <div className={`${styles.category_wrapper}`}>
        <h2>SHOP BY CATEGORY</h2>

        <ul className={`grid ${styles.category_cards}`}>
          {categories.map((category) => (
            <li className={`flex flex-col`} key={category.title}>
              <Image
                src={category.image}
                alt={category.title}
                className={`full-width`}
              />

              <Link href={category.url} className={`flex align-y`}>
                {category.title}
                <LinkArrow />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ShopByCategory;
