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
    </>
  );
}
