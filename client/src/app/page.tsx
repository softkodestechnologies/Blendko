import Jumbotron from "@/components/layouts/Jumbotron";
import Highlights from "@/components/layouts/Highlights";
import ShopByCategory from "@/components/layouts/ShopByCategory";
import Framer from "@/components/layouts/Framer";
import SpaoOuterWeek from "@/components/layouts/SpaoOuterWeek/SpaoOuterWeek";
import CollectionSection from "@/components/layouts/CollectionSection";

export default function Home() {

  return (
    <div className="min-h-screen bg-white">
      {/* JUMBOTRON TEST*/}
      <Jumbotron />

      {/*HIGHLIGHTS */}
      <Highlights />

      {/*Shop By Category */}
      <ShopByCategory />

      {/*Framer */}
      <Framer />

      {/*SpaoOuterWeek */}
      <SpaoOuterWeek />

       {/*CollectionSection */}
       <CollectionSection />

    </div>
  );
};
