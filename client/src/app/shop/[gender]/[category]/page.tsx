'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetCategoryByNameQuery, useGetProductsByCategoryGenderQuery } from '@/services/userService';
import usePagination from '@/utils/hooks/usePagination';
import useFilterOptions from '@/utils/hooks/useFilterOptions';
import CategoryList from '@/components/shop/CategoryList';
import ProductList from '@/components/shop/ProductList';
import Filter from '@/components/shop/Filter';
import Pagination from '@/components/shop/Pagination';
import LoadingSkeleton from '@/components/shop/LoadingSkeleton';

interface ShopCategoryProps {
  params: {
    gender: string;
    category: string;
  };
}

const ShopCategory: React.FC<ShopCategoryProps> = ({ params }) => {
  const { gender, category } = params;
  const [isMounted, setIsMounted] = useState(false);

  // Fetch the category by name to get the ID
  const { data: categoryData, isLoading: isLoadingCategory } = useGetCategoryByNameQuery(category);

  const categoryId = categoryData?.category?._id;

  // Fetch products using category ID and gender
  const { data: productsData, isLoading: isLoadingProducts } = useGetProductsByCategoryGenderQuery(
    { categoryId, gender },
    { skip: !categoryId } 
  );
  const { data: products, isLoading, handlePriceRange, handleSearch, handleSort, handleDropdownSelect, handleCheckboxChange, } = useFilterOptions();
  const { totalPages, currentPage, handlePageChange } = usePagination({ productCount: productsData?.products.productsCount || 0 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    console.log('CATEGORY DATA', categoryData);
    console.log('PRODUCT DATA', productsData);
  }, [categoryData, productsData]);

  if (!isMounted || isLoadingCategory) {
    return <LoadingSkeleton />;
  }

  return (
    <div>
      <h1>{gender} - {category}</h1>
      <CategoryList selectedCategory={category} onCategorySelect={() => {}} />
      <Filter
        onSearch={handleSearch}
        onPriceRangeChange={handlePriceRange}
        onSortChange={handleSort}
        onCheckboxChange={handleCheckboxChange}
      />
      {isLoadingProducts ? <LoadingSkeleton /> : <ProductList products={productsData?.products || []} />}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default ShopCategory;

