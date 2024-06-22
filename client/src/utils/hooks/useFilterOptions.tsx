'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchProducts } from '@/services/userSlice';
import checkURL from '../helpers/checkUrl';

function useFilterOptions() {
  const { data, isLoading } = useSelector((state: any) => state.user.products);
  const searchParams = useSearchParams();

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

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const { url, hash } = checkURL([
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
    ]);

    router.push(url);
    dispatch(fetchProducts(hash) as any);
  }, [
    pageNum,
    pp,
    keyword,
    category,
    priceGTE,
    priceLTE,
    rating,
    sort,
    gender,
    colors,
    brand,
    technology,
    fashionCollection,
    sizes,
    dressStyle,
    router,
    dispatch,
  ]);

  const searchArgs = [
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
  ];

  const handleDropdownSelect = (value: string) => {
    const { url } = checkURL([...searchArgs, { key: 'category', value }]);
    router.push(url);
  };

  const handleSearch = (key: string, value: string) => {
    const { url } = checkURL([...searchArgs, { key, value }]);
    router.push(url);
  };

  const handlePriceRange = (value: [number, number]) => {
    const { url } = checkURL([
      ...searchArgs,
      { key: 'price[gte]', value: value[0].toString() },
      { key: 'price[lte]', value: value[1].toString() },
    ]);
    router.push(url);
  };

  const handleSort = (value: string) => {
    const { url } = checkURL([...searchArgs, { key: 'sort', value }]);
    router.push(url);
  };

  const handleCheckboxChange = (key: string, value: string[]) => {
    if (!Array.isArray(value)) return;
    const filteredValue = value.filter(v => v); 
    const { url } = checkURL([...searchArgs, { key, value: filteredValue.join(',') }]);
    router.push(url);
  };

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
