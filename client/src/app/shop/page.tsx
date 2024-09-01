'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {  useState, Suspense } from 'react';

import useFilterOptions from '@/utils/hooks/useFilterOptions';
import usePagination from '@/utils/hooks/usePagination';
import ProductList from '@/components/shop/ProductList';
import Filter from '@/components/shop/Filter';
import Pagination from '@/components/shop/Pagination';
import LoadingSkeleton from '@/components/shop/LoadingSkeleton';
import FilterNav from '@/components/shop/FilterNav';
import styles from './Shop.module.css';
import BackDrop from '@/components/ui/BackDrop';
import useDimension from '@/utils/hooks/useDimension';
import { NavFilterIcon } from '../../../public/svg/icon';

const variants = {
  visible: {
    gridTemplateColumns: '295px 1fr',
  },
  hidden: {
    gridTemplateColumns: '1fr',
  },
};

const Shop = () => {
  const { width } = useDimension();
  const [isMounted, setIsMounted] = useState(false);
  const {
    data: products,
    isLoading,
    handlePriceRange,
    handleSearch,
    handleSort,
    handleDropdownSelect,
    handleCheckboxChange,
    handleSubcategoryChange, 
  } = useFilterOptions();
  const [activeIndex, setActiveIndex] = useState(0);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [sortBy, setSortBy] = useState('Newest');
  const [openSidebarXl, setOpenSidebarXl] = useState(true);
  const { totalPages, currentPage, handlePageChange } = usePagination({
    productCount: products?.productsCount || 0,
  });

  const menuItems = [
    'All Sale',
    'Shoes',
    'Clothing',
    'Accessories',
    '40% or More Off',
  ];

  const setIndex = (index: React.SetStateAction<number>) => {
    setActiveIndex(index);
  };


  const handleSortChange = (value: string) => {
    setSortBy(value);
    handleSort(value);
  };


  return (
    <section>
      <motion.div
        variants={variants}
        transition={{ duration: 0, type: 'tween' }}
        animate={openSidebarXl ? 'visible' : 'hidden'}
        className={`grid full-width section_container ${styles.main}`}
      >
        <AnimatePresence mode="wait">
          {width && width < 1024 && openSidebar && (
            <Filter
              onSearch={handleSearch}
              onSortChange={handleSort}
              className={`${styles.mobile_filter}`}
              onPriceRangeChange={handlePriceRange}
              onCheckboxChange={handleCheckboxChange}
              onSubcategoryChange={handleSubcategoryChange}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {width && width < 1024 && openSidebar && (
            <BackDrop
              onClick={() => setOpenSidebar(!openSidebar)}
              style={{
                zIndex: 59,
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {openSidebarXl && (
            <Filter
              onSearch={handleSearch}
              onSortChange={handleSort}
              onPriceRangeChange={handlePriceRange}
              className={`${styles.desktop_filter}`}
              onCheckboxChange={handleCheckboxChange}
              onSubcategoryChange={handleSubcategoryChange}
            />
          )}
        </AnimatePresence>

        <section className={`full-width ${styles.main_pane}`}>
          <FilterNav
            setIndex={setIndex}
            menuItems={menuItems}
            onSearch={handleSearch}
            onSort={handleSortChange}
            activeIndex={activeIndex}
            onOpenSidebar={() => setOpenSidebarXl(!openSidebarXl)}
            sortBy={sortBy}
          />

          <div
            className={`flex space-between align-y ${styles.mobile_sub_nav}`}
          >
            <h2>{products?.productsCount || 0} Results </h2>

            <button
              className={`flex center`}
              onClick={() => setOpenSidebar(!openSidebar)}
            >
              Filter
              <NavFilterIcon
                style={{
                  transform: 'rotate(90deg)',
                }}
              />
            </button>
          </div>

          <ProductList
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            isSideBarVisible={openSidebarXl}
            products={products?.products || []}
          />


        </section>
      </motion.div>
    </section>
  );
};

const SuspendedShop = () => (
  <Suspense fallback={<LoadingSkeleton />}>
    <Shop />
  </Suspense>
);

export default SuspendedShop;
