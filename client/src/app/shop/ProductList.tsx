import ProductItem from './ProductItem';
import styles from './ProductList.module.css';

const products = new Array(12).fill({
  title: 'Full Coverage Conceal',
  price: '$500.99',
  imgSrc: '/make-up.jpg',
});

export default function ProductList() {
  return (
    <div className={styles.productList}>
      {products.map((product, index) => (
        <ProductItem key={index} product={product} />
      ))}
    </div>
  );
}
