import React from 'react';
import Link from 'next/link';
import { Product } from '@/utils/types';
import Image from 'next/image';

interface ProductListProps {
  products: Product[];
}

const generateSlug = (name: string, id: string) => {
    return `${name.replace(/\s+/g, '-').toLowerCase()}-${id}`;
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="product-list">
      {products.length === 0? <div className="no-products">
        <h2>No Products Found</h2>
      </div>: ''}
      {products.map((product) => (
        <div key={product._id} className="product-item">
          <Link href={`/shop/product/${generateSlug(product.name, product._id)}`}>
            <div className="image-container">
              <Image 
                src={product.images[0].url} 
                alt={product.description} 
                width={180} 
                height={180} 

              />
            </div>
            <h5>{product.name}</h5>
            <p>{product.description}</p>
            <p>{`${product.colors.length} colour${product.colors.length > 1? 's' : ''}`}</p>
            <h5>Price: ${product.price}</h5>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
