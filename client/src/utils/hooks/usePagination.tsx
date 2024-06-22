import { useRouter, useSearchParams } from 'next/navigation';
import checkURL from '@/utils/helpers/checkUrl';

function usePagination({ productCount }: { productCount: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageNum = Number(searchParams.get('page')) || 1;
  const pp = Number(searchParams.get('pp')) || 10;

  const totalPages = Math.ceil(productCount / pp);

  const urlParams = [
    { key: 'page', value: pageNum.toString() },
    { key: 'pp', value: pp.toString() },
  ];

  const { hash, url } = checkURL([...urlParams]);

  const handlePageChange = (value: number) => {
    const newUrl = url.replace(`page=${pageNum}`, `page=${value}`);
    router.push(newUrl);
  };

  return {
    totalPages,
    currentPage: pageNum,
    handlePageChange,
    url,
    hash,
  };
}

export default usePagination;

