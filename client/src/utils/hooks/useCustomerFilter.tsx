import { useState, useCallback, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function useCustomerFilter() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const newFilters: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      newFilters[key] = value;
    });
    setFilters(newFilters);
  }, [searchParams]);

  const updateFilters = useCallback((key: string, value: string) => {
    setFilters(prev => {
      if (value === '') {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: value };
    });
  }, []);

  const handleSearch = useCallback((key: string, value: string) => {
    updateFilters(key, value);
  }, [updateFilters]);

  useEffect(() => {
    const url = new URL(window.location.href);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    });
    router.push(url.pathname + url.search);
  }, [filters, router]);

  return {
    filters,
    handleSearch,
  };
}

export default useCustomerFilter;