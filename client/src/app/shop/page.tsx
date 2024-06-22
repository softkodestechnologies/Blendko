"use client";

import React, { useEffect, useState, Suspense } from 'react';
import useFilterOptions from '@/utils/hooks/useFilterOptions';
import usePagination from '@/utils/hooks/usePagination';
import CategoryList from '@/components/shop/CategoryList';
import ProductList from '@/components/shop/ProductList';
import Filter from '@/components/shop/Filter';
import Pagination from '@/components/shop/Pagination';
import LoadingSkeleton from '@/components/shop/LoadingSkeleton';
import styles from './Shop.module.css';
import Image from 'next/image';

const Shop = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data: products, isLoading, handlePriceRange, handleSearch, handleSort, handleDropdownSelect, handleCheckboxChange, } = useFilterOptions();
  const { totalPages, currentPage, handlePageChange } = usePagination({ productCount: products?.productsCount || 0 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    console.log('Products:', products);
    console.log('Is Loading:', isLoading);
  }, [products, isLoading]);

  if (!isMounted) {
    return(
      <div className='container flex'>
      <main className={styles.main}>
          <aside className={styles.sidebar}>
              <Filter
                  onSearch={handleSearch}
                  onPriceRangeChange={handlePriceRange}
                  onSortChange={handleSort}
                  onCheckboxChange={handleCheckboxChange}
              />
          </aside>
  
          <LoadingSkeleton />
      </main>
    
  </div>
    );
  }

  return (
    <div className='container flex'>
        <main className={styles.main}>
            <aside className={styles.sidebar}>
                <Filter
                    onSearch={handleSearch}
                    onPriceRangeChange={handlePriceRange}
                    onSortChange={handleSort}
                    onCheckboxChange={handleCheckboxChange}
                />
            </aside>
    
            <div>
                <Suspense fallback={<LoadingSkeleton />}>
                  {isLoading ? <LoadingSkeleton /> : <ProductList products={products?.products || []} />}
                </Suspense>
                {isLoading ? '' :<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
                <RecentlyViewedSection items={viewedItems} />
            </div>
        </main>
      
    </div>
  );
};

const viewedItems = [
    {
      id: 1,
      imageSrc: '/picture.png',
      altText: 'Polo with Contrast Trims',
      title: 'Polo with Contrast Trims',
      price: '$212'
    },
    {
      id: 2,
      imageSrc: '/picture.png',
      altText: 'Gradient Graphic T-shirt',
      title: 'Gradient Graphic T-shirt',
      price: '$145'
    },
    {
      id: 3,
      imageSrc: '/picture.png',
      altText: 'Gradient Graphic T-shirt',
      title: 'Gradient Graphic T-shirt',
      price: '$145'
    },
    {
      id: 4,
      imageSrc: '/picture.png',
      altText: 'Gradient Graphic T-shirt',
      title: 'Gradient Graphic T-shirt',
      price: '$145'
    },
  ];
  
  const RecentlyViewedSection: React.FC<{ items: typeof viewedItems }> = ({ items }) => {
    return (
      <section className={styles.recommendations}>
        <h2 className={styles.recommendations_title}>Recently Viewed Items</h2>
        <div className={styles.recommendationItems}>
          {items.map(item => (
            <div key={item.id} className={styles.recommendationItem}>
              <Image src={item.imageSrc} alt={item.altText} width={180} height={180} />
              <div className={styles.recommendationDetails}>
                <h3>{item.title}</h3>
                <p>{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

export default Shop;