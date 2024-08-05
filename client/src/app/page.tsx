import Jumbotron from '@/components/layouts/Jumbotron';
import Framer from '@/components/layouts/Framer';
import SpaoOuterWeek from '@/components/layouts/SpaoOuterWeek/SpaoOuterWeek';
import CollectionSection from '@/components/layouts/CollectionSection';

import Hero from '@/components/home/hero/Hero';
import ShopByCategory from '@/components/home/shop-by-category/ShopByCategory';
import CustomizeSection from '@/components/home/customize/CustomizeSection';
import Highlights from '@/components/home/highlight/Highlights';

export default function Home() {
  return (
    <>
      <Hero />
      <ShopByCategory />
      <CustomizeSection />
      <Highlights />
      {/* <Jumbotron />

      <Highlights />

      <ShopByCategory />

      <Framer />

      <SpaoOuterWeek />

      <CollectionSection /> */}
    </>
  );
}
