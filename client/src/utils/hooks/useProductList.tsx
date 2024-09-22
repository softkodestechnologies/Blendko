import { useState, useEffect, useCallback } from 'react';
import { useGetProductsQuery } from '@/services/userService'

interface Product {
  sku: string;
  name: string;
  status: 'Published' | 'Draft';
  price: number;
  quantity: number;
  modified: string;
  published: string;
}

interface UseProductListResult {
  products: Product[];
  loading: boolean;
  error: any;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

export const useProductList = (itemsPerPage: number = 10): UseProductListResult => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = {
    pp: itemsPerPage,
    page: currentPage,
    keyword: searchTerm,
  };

  const { data, error, isLoading } = useGetProductsQuery(queryParams);

  const products: Product[] = data?.products.map((product: any) => ({
    sku: product.sku,
    name: product.name,
    status: product.status || 'Published',
    price: product.price,
    quantity: product.quantity,
    modified: new Date(product.updatedAt).toLocaleDateString(),
    published: new Date(product.createdAt).toLocaleDateString(),
  })) || [];

  const totalPages = Math.ceil((data?.productsCount || 0) / itemsPerPage);

  const debouncedSetSearchTerm = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
      setCurrentPage(1);
    }, 300),
    []
  );

  return {
    products,
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