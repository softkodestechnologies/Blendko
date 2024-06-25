'use client';

import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchProducts } from '@/services/userSlice';
import checkURL from '../helpers/checkUrl';

function useFilterOptions() {
  const { data, isLoading } = useSelector((state: any) => state.user.products);
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const pageNum = searchParams.get('page');
  const pp = searchParams.get('pp');
  const keyword = searchParams.get('keyword');
  const category = searchParams.get('category');
  const priceGTE = searchParams.get('price[gte]');
  const priceLTE = searchParams.get('price[lte]');
  const rating = searchParams.get('rating');
  const sort = searchParams.get('sort');
  const gender = searchParams.get('gender');
  const colors = searchParams.get('colors');
  const brand = searchParams.get('brand');
  const technology = searchParams.get('technology');
  const fashionCollection = searchParams.get('fashion_collection');
  const sizes = searchParams.get('sizes');
  const dressStyle = searchParams.get('dress_style');

  const searchArgs = useMemo(() => [
    { key: 'page', value: pageNum },
    { key: 'pp', value: pp },
    { key: 'keyword', value: keyword },
    { key: 'category', value: category },
    { key: 'price[gte]', value: priceGTE },
    { key: 'price[lte]', value: priceLTE },
    { key: 'rating', value: rating },
    { key: 'sort', value: sort },
    { key: 'gender', value: gender },
    { key: 'colors', value: colors },
    { key: 'brand', value: brand },
    { key: 'technology', value: technology },
    { key: 'fashion_collection', value: fashionCollection },
    { key: 'sizes', value: sizes },
    { key: 'dress_style', value: dressStyle },
  ], [pageNum, pp, keyword, category, priceGTE, priceLTE, rating, sort, gender, colors, brand, technology, fashionCollection, sizes, dressStyle]);

  useEffect(() => {
    const { url, hash } = checkURL(searchArgs);
    router.push(url);
    dispatch(fetchProducts(hash) as any);
  }, [searchArgs, router, dispatch]);

  const handleDropdownSelect = useCallback((value: string) => {
    const { url } = checkURL([...searchArgs, { key: 'category', value }]);
    router.push(url);
  }, [searchArgs, router]);

  const handleSearch = useCallback((key: string, value: string) => {
    const { url } = checkURL([...searchArgs, { key, value }]);
    router.push(url);
  }, [searchArgs, router]);

  const handlePriceRange = useCallback((value: [number, number]) => {
    const { url } = checkURL([
      ...searchArgs,
      { key: 'price[gte]', value: value[0].toString() },
      { key: 'price[lte]', value: value[1].toString() },
    ]);
    router.push(url);
  }, [searchArgs, router]);

  const handleSort = useCallback((value: string) => {
    const { url } = checkURL([...searchArgs, { key: 'sort', value }]);
    router.push(url);
  }, [searchArgs, router]);

  const handleCheckboxChange = useCallback((key: string, value: string[]) => {
    if (!Array.isArray(value)) return;
    const filteredValue = value.filter(v => v);
    const { url } = checkURL([...searchArgs, { key, value: filteredValue.join(',') }]);
    router.push(url);
  }, [searchArgs, router]);

  return {
    data,
    isLoading,
    handlePriceRange,
    handleSearch,
    handleSort,
    handleDropdownSelect,
    handleCheckboxChange,
  };
}

export default useFilterOptions;
