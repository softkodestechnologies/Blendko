import Jumbotron from '@/components/layouts/Jumbotron';
import Highlights from '@/components/layouts/Highlights';
import Framer from '@/components/layouts/Framer';
import SpaoOuterWeek from '@/components/layouts/SpaoOuterWeek/SpaoOuterWeek';
import CollectionSection from '@/components/layouts/CollectionSection';

import Hero from '@/components/home/hero/Hero';
import ShopByCategory from '@/components/home/shop-by-category/ShopByCategory';

export default function Home() {
  return (
    <>
      <Hero />
      <ShopByCategory />

      {/* <Jumbotron />

      <Highlights />

      <ShopByCategory />

      <Framer />

      <SpaoOuterWeek />

      <CollectionSection /> */}
    </>
  );
}
