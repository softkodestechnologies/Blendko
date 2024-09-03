'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetProductQuery } from '@/services/userService';
import ProductLoadingSkeleton from '@/components/shop/ProductLoadingSkeleton';
import useAddToCart from '@/utils/hooks/useAddToCart';
import useReduceCartItems from '@/utils/hooks/useReduceCartItems';

import styles from './ProductPage.module.css';

import ProductImage from '@/components/shop/shopDetails/product_images/ProductImage';
import ProductInitials from '@/components/shop/shopDetails/product_initials/ProductInitials';
import ProductDetailsAction from '@/components/shop/shopDetails/product_detail_actions/ProductDetailsAction';
import ProductHighligtedInfo from '@/components/shop/shopDetails/product_highlighted_detail/ProductHighligtedInfo';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const { slug } = params;
  const productId = slug?.split('-').pop();
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  const { data: productData, isLoading: isLoadingProduct } = useGetProductQuery(
    productId!,
    { skip: !productId }
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isLoadingProduct) {
    return <ProductLoadingSkeleton />;
  }

  if (!productData) {
    return (
      <div className="flex center not-found">
        <h1>Product not found</h1>
      </div>
    );
  }

  const handleCustomize = () => {
    if (productData) {
      const productToSave = {
        id: productData.product.id,
        name: productData.product.name,
        image: productData.product.images[0]?.url,
      };
      localStorage.setItem('productData', JSON.stringify(productToSave));
      router.push('/customize');
    }
  };

  return (
    <section>
      <div className={`section_container grid ${styles.container}`}>
        <div>
          <ProductInitials
            details={productData.product || {}}
            className={`${styles.mobile}`}
          />

          <ProductImage images={productData.product.images || []} />
        </div>

        <div className={styles.productDetails}>
          <ProductInitials
            className={`${styles.desktop}`}
            details={productData.product || {}}
          />

          <ProductDetailsAction details={productData.product || {}} />

          <ProductHighligtedInfo details={productData.product || {}} />
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
