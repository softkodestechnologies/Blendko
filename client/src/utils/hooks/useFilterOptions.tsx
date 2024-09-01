'use client';

import { useEffect, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchProducts } from '@/services/userSlice';
import checkURL from '../helpers/checkUrl';

function useFilterOptions() {
  const { data, isLoading } = useSelector((state: any) => state.user.products);
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const [filters, setFilters] = useState<Record<string, string | string[]>>({});

  useEffect(() => {
    const newFilters: Record<string, string | string[]> = {};
    searchParams.forEach((value, key) => {
      newFilters[key] = value;
    });
    setFilters(newFilters);
  }, [searchParams]);

  useEffect(() => {
    const { url, hash } = checkURL(Object.entries(filters).map(([key, value]) => ({ key, value })));
    router.push(url);
    dispatch(fetchProducts(hash) as any);
  }, [filters, router, dispatch]);

  const updateFilters = useCallback((key: string, value: string | string[]) => {
    setFilters(prev => {
      if (key === 'sort') {
        switch (value) {
          case 'newest':
            return { ...prev, sort: '-createdAt' };
          case 'cheapest':
            return { ...prev, sort: 'price' };
          case 'expensive':
            return { ...prev, sort: '-price' };
          case 'popular':
            return { ...prev, sort: '-ratings' };
          default:
            return prev;
        }
      }

      if (Array.isArray(value)) {
        if (value.length === 0) {
          const { [key]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [key]: value.join(',') };
      }
      if (value === '') {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: value };
    });
  }, []);

  const handleSubcategoryChange = useCallback((subcategory: string, attribute: string) => {
    setFilters(prev => {
      const currentAttributes = prev[subcategory] ? (prev[subcategory] as string).split(',') : [];
      const updatedAttributes = currentAttributes.includes(attribute)
        ? currentAttributes.filter(attr => attr !== attribute)
        : [...currentAttributes, attribute];
      
      if (updatedAttributes.length === 0) {
        const { [subcategory]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [subcategory]: updatedAttributes.join(',') };
    });
  }, []);

  const handleCheckboxChange = useCallback((key: string, value: string[]) => {
    updateFilters(key, value);
  }, [updateFilters]);

  const handleSearch = useCallback((key: string, value: string) => {
    updateFilters(key, value);
  }, [updateFilters]);

  const handlePriceRange = useCallback((value: [number, number]) => {
    updateFilters('price[gte]', value[0].toString());
    updateFilters('price[lte]', value[1].toString());
  }, [updateFilters]);

  const handleSort = useCallback((value: string) => {
    updateFilters('sort', value);
  }, [updateFilters]);

  const handleDropdownSelect = useCallback(
    (value: string) => {
      updateFilters('category', value);
    },
    [updateFilters]
  );

  return {
    data,
    isLoading,
    filters,
    handlePriceRange,
    handleSearch,
    handleSort,
    handleCheckboxChange,
    handleSubcategoryChange,
    handleDropdownSelect,
  };
}

export default useFilterOptions;