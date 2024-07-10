'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetProductQuery } from '@/services/userService';
import ProductLoadingSkeleton from '@/components/shop/ProductLoadingSkeleton';
import useAddToCart from '@/utils/hooks/useAddToCart';
import useReduceCartItems from '@/utils/hooks/useReduceCartItems';
import styles from './ProductPage.module.css';
import Image from 'next/image';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const { slug } = params;
  const productId = slug?.split('-').pop(); // Extract ID from the slug
  const [isMounted, setIsMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [isFreeDeliveryOpen, setIsFreeDeliveryOpen] = useState(false);
  const [isHowThisWasMadeOpen, setIsHowThisWasMadeOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isShippingReturnOpen, setIsShippingReturnOpen] = useState(false);

  // Conditionally fetch the product by ID only if productId is defined
  const { data: productData, isLoading: isLoadingProduct } = useGetProductQuery(productId!, { skip: !productId });
  const { addItemToCart } = useAddToCart(); 
  const { reduceCartItem } = useReduceCartItems();



  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (productData) {
      setSelectedImage(productData.product.images[0]?.url); 

    }
  }, [productData]);

  if (!isMounted || isLoadingProduct) {
    return <ProductLoadingSkeleton />;
  }

  if (!productData) {
    return <div className='flex center not-found'><h1>Product not found</h1></div>;
  }

  const handleAddToCart = () => {
    addItemToCart(productData.product);
  };

  const handleIncrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    const updatedCartItems = addItemToCart(productData.product); 
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      const updatedCartItems = reduceCartItem(productData.product);
    }
  };

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        {/**Home &gt; Shop &gt; Men &gt; T-shirts**/}
        <div className={styles.mobileHeader}>
          <h1>{productData.product.name}</h1>
            <div className={styles.mobilePrice}>
              <span className={styles.currentPrice}>
                ${((productData.product.price - productData.product.price * productData.product.discount / 100)).toFixed(2)}
              </span>
              <span className={styles.originalPrice}>${productData.product.price}</span>
            </div>
          </div>
      </nav>
      <div className={styles.productPage}>
        <div className={styles.imageGallery}>
          <div className={styles.mainImage}>
            <Image src={selectedImage || '/people.png'} alt={productData.product.name} width={100} height={100}/>
          </div>
          <div className={styles.thumbnailImages}>
            {productData.product.images.map((image: any, index: number) => (
              <Image
                key={index}
                src={image.url}
                width={50}
                height={50}
                alt={productData.product.name}
                onClick={() => handleImageClick(image.url)}
                className={selectedImage === image.url ? styles.active : ''}
              />
            ))}
          </div>
        </div>
        
        <div className={styles.productDetails}>
          <h1>{productData.product.name}</h1>
          <div className={styles.rating}>
            <span>⭐️⭐️⭐️⭐️⭐️</span> 4.5/5
          </div>
          <div className={styles.price}>
            <span className={styles.currentPrice}>
              ${((productData.product.price - productData.product.price * productData.product.discount / 100)).toFixed(2)}
            </span>
            <span className={styles.originalPrice}>${productData.product.price}</span>
          </div>
          <p>{productData.product.description}</p>

          <div className={styles.options}>

            <hr className={styles.rule} />

            <div className={styles.colors}>
              <h3>Select Colors</h3>
              {productData.product.colors.map((color: string, index: number) => (
                <div key={index} className={styles.colorButton} style={{ backgroundColor: color }}></div>
              ))}
            </div>

            <hr className={styles.rule} />

            <div className={styles.sizes}>
              <h3>Choose Size</h3>
              {productData.product.sizes.map((size: string, index: number) => (
                <button key={index} className={styles.sizeButton}>{size}</button>
              ))}
            </div>

            <div className={`flex space-between ${styles.btnGroup}`}>
              <div className="flex space-between">
                  <div className={styles.quantity}>
                    <button onClick={handleDecrementQuantity}>-</button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrementQuantity}>+</button>
                  </div>
              </div>
                <button className={styles.addToCartButton} onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
          <div className={styles.extraDetails}>
          <hr />

          <div className={styles.detailsContainer}>
            <h3
              onClick={() => setIsFreeDeliveryOpen(!isFreeDeliveryOpen)}
              className={styles.detailsTitle}
            >
              Free Delivery and Returns
              {isFreeDeliveryOpen ? (
                <AiOutlineUp className={styles.detailsIcon} />
              ) : (
                <AiOutlineDown className={styles.detailsIcon} />
              )}
            </h3>
            {isFreeDeliveryOpen && (
              <p className={styles.detailsContent}>
                Get free delivery and returns on all orders.
              </p>
            )}
          </div>

          <hr />

          <div className={styles.detailsContainer}>
            <h3
              onClick={() => setIsHowThisWasMadeOpen(!isHowThisWasMadeOpen)}
              className={styles.detailsTitle}
            >
              How This Was Made
              {isHowThisWasMadeOpen ? (
                <AiOutlineUp className={styles.detailsIcon} />
              ) : (
                <AiOutlineDown className={styles.detailsIcon} />
              )}
            </h3>
            {isHowThisWasMadeOpen && (
              <p className={styles.detailsContent}>
                Information about the product&apos;s manufacturing process.
              </p>
            )}
          </div>

          <hr />

          <div className={styles.detailsContainer}>
            <h3
              onClick={() => setIsReviewsOpen(!isReviewsOpen)}
              className={styles.detailsTitle}
            >
              Reviews (12)
              {isReviewsOpen ? (
                <AiOutlineUp className={styles.detailsIcon} />
              ) : (
                <AiOutlineDown className={styles.detailsIcon} />
              )}
            </h3>
            {isReviewsOpen && (
              <p className={styles.detailsContent}>Customer reviews go here.</p>
            )}
          </div>

          <hr />

          <div className={styles.detailsContainer}>
            <h3
              onClick={() => setIsShippingReturnOpen(!isShippingReturnOpen)}
              className={styles.detailsTitle}
            >
              Shipping & Return
              {isShippingReturnOpen ? (
                <AiOutlineUp className={styles.detailsIcon} />
              ) : (
                <AiOutlineDown className={styles.detailsIcon} />
              )}
            </h3>
            {isShippingReturnOpen && (
              <p className={styles.detailsContent}>
                Shipping and return policy details.
              </p>
            )}
          </div>

          <hr />

          </div>
        </div>
      </div>

      <div className={styles.recommendations}>
        <h2>You might also like</h2>
        <div className={styles.recommendationItems}>
          {recommendationItems.map((item: any, index: number) => (
            <div key={index} className={styles.recommendationItem}>
              <Image src={item.imageSrc || '/picture.png'} alt={item.altText} width={180} height={180} />
              <div className={styles.recommendationDetails}>
                <h3>{item.title}</h3>
                <p>{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const recommendationItems = [
  {
    id: 1,
    imageSrc: '/picture.png',
    altText: 'Polo with Contrast Trims',
    title: 'Polo with Contrast Trims',
    price: '$212'
  },
  {
    id: 2,
    imageSrc: '/picture.png',
    altText: 'Gradient Graphic T-shirt',
    title: 'Gradient Graphic T-shirt',
    price: '$145'
  },
  {
    id: 3,
    imageSrc: '/picture.png',
    altText: 'Gradient Graphic T-shirt',
    title: 'Gradient Graphic T-shirt',
    price: '$145'
  },
  {
    id: 4,
    imageSrc: '/picture.png',
    altText: 'Gradient Graphic T-shirt',
    title: 'Gradient Graphic T-shirt',
    price: '$145'
  },
];

export default ProductPage;
