import styles from './product.module.css';

import Product from './Product';
import Pagination from './Pagination';
import { Product as P } from '@/utils/types';

interface ProductListProps {
  products: P[];
  totalPages: number;
  currentPage: number;
  isSideBarVisible: boolean;
  onPageChange: (page: number) => void;
}

const generateSlug = (name: string, id: string) => {
  return `${name.replace(/\s+/g, '-').toLowerCase()}-${id}`;
};

const ProductList: React.FC<ProductListProps> = ({
  products,
  isSideBarVisible,
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <>
      {products.length === 0 ? (
        <div className="flex center">
          <h2>No Product Fits Your Filter Preferences</h2>
        </div>
      ) : null}

      <div
        className={`grid full-width ${styles.product_list} ${
          isSideBarVisible ? styles.with_sidebar : styles.without_sidebar
        }`}
      >
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            slug={`/shop/product/${generateSlug(product.name, product._id)}`}
          />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default ProductList;
