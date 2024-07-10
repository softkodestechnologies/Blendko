"use client";

import React, { useEffect, useState, Suspense } from 'react';
import useFilterOptions from '@/utils/hooks/useFilterOptions';
import usePagination from '@/utils/hooks/usePagination';
import CategoryList from '@/components/shop/CategoryList';
import ProductList from '@/components/shop/ProductList';
import Filter from '@/components/shop/Filter';
import Pagination from '@/components/shop/Pagination';
import LoadingSkeleton from '@/components/shop/LoadingSkeleton';
import FilterNav from '@/components/shop/FilterNav';
import styles from './Shop.module.css';
import Image from 'next/image';
import { FaSlidersH } from 'react-icons/fa';

const Shop = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data: products, isLoading, handlePriceRange, handleSearch, handleSort, handleDropdownSelect, handleCheckboxChange, } = useFilterOptions();
  const { totalPages, currentPage, handlePageChange } = usePagination({ productCount: products?.productsCount || 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    'All Sale',
    'Shoes',
    'Clothing',
    'Accessories',
    '40% or More Off',
  ];

  const setIndex = (index: React.SetStateAction<number>) => {
    setActiveIndex(index);
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return(
      <div className="container">
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
    <div className="container">
        <main className={styles.main}>
            <aside className={styles.sidebar}>
                <Filter
                    onSearch={handleSearch}
                    onPriceRangeChange={handlePriceRange}
                    onSortChange={handleSort}
                    onCheckboxChange={handleCheckboxChange}
                />
            </aside>
    
            <div className={styles.products}>
                {isLoading ? 
                <div>
                  <FilterNav onSearch={handleSearch} menuItems={menuItems} activeIndex={activeIndex} setIndex={setIndex}/>
                  <LoadingSkeleton />
                </div> : 
                <div>
                  <div className={styles.filterParent}>
                    <FilterNav onSearch={handleSearch} menuItems={menuItems} activeIndex={activeIndex} setIndex={setIndex}/>
                    <div className={styles.filterCon}>
                      <div className={styles.hideFilter}><span>Hide Filter</span> <FaSlidersH /></div> 
                      <div className="sort">Sort by</div>
                    </div>
                  </div>
                  <ProductList products={products?.products || []} />
                </div>
                }
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

  const SuspendedShop = () => (
    <Suspense fallback={<LoadingSkeleton />}>
      <Shop />
    </Suspense>
  );
  
  export default SuspendedShop;