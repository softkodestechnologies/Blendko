import styles from './ProductItem.module.css';
import Image from 'next/image';
import { ProductItemType } from '@/utils/types';

interface ProductItemProps {
  product: ProductItemType;
}

export default function ProductItem({ product }: ProductItemProps) {
  return (
    <div className={styles.productItem}>
      <Image src={product.imgSrc} alt={product.title} width={200} height={300} />
      <h3>{product.title}</h3>
      <p>{product.price}</p>
    </div>
  );
}
