import { useState, useEffect, useCallback } from 'react';
import { useGetCategoriesQuery } from '@/services/userService';

interface Category {
  _id: string;
  name: string;
  status: 'Published' | 'Draft';
  products: any[];
  createdAt: string;
  updatedAt: string;
}

interface UseCategoryListResult {
  categories: Category[];
  loading: boolean;
  error: any;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

export const useCategoryList = (itemsPerPage: number = 10): UseCategoryListResult => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = {
    pp: itemsPerPage,
    page: currentPage,
    keyword: searchTerm,
  };

  const { data, error, isLoading } = useGetCategoriesQuery(queryParams);

  const categories: Category[] = data?.categories.map((category: any) => ({
    _id: category._id,
    name: category.name,
    status: category.products.length > 0 ? 'Published' : 'Draft',
    products: category.products,
    createdAt: new Date(category.createdAt).toLocaleDateString(),
    updatedAt: new Date(category.updatedAt).toLocaleDateString(),
  })) || [];

  const totalPages = Math.ceil((data?.categories.length || 0) / itemsPerPage);

  const debouncedSetSearchTerm = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
      setCurrentPage(1);
    }, 300),
    []
  );

  return {
    categories,
    loading: isLoading,
    error,
    searchTerm,
    setSearchTerm: debouncedSetSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
  };
};

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}