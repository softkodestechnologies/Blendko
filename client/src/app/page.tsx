import Jumbotron from "@/components/layouts/Jumbotron";
import Highlights from "@/components/layouts/Highlights";
import ShopByCategory from "@/components/layouts/ShopByCategory";
import Framer from "@/components/layouts/Framer";
import SpaoOuterWeek from "@/components/layouts/SpaoOuterWeek/SpaoOuterWeek";
import CollectionSection from "@/components/layouts/CollectionSection";

export default function Home() {
  // const [isNavVisible, setIsNavVisible] = useState<boolean>(true);
  // const prevScrollPos = useRef<number>(typeof window !== 'undefined' ? window.pageYOffset : 0);
  // const [navOpen, setNavOpen] = useState<boolean>(false);
  

  // const toggleNav = () => {
  //   setNavOpen(!navOpen);
  // };


  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollPos = window.pageYOffset;

  //     if (prevScrollPos.current > currentScrollPos || currentScrollPos === 0) {
  //       setIsNavVisible(true);
  //     } else {
  //       setIsNavVisible(false);
  //     }

  //     prevScrollPos.current = currentScrollPos;
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

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
