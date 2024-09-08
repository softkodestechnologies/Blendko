import { useState, useEffect, useCallback } from 'react';
import { useAddToWishlistMutation, useRemoveFromWishlistMutation, useGetWishlistQuery } from '@/services/userService';

export const useWishlist = (productId: string, isAuthenticated: boolean) => {
  const { data: wishlistData, refetch } = useGetWishlistQuery({}, { skip: !isAuthenticated });
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const localWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      if (localWishlist.length > 0) {
        localWishlist.forEach(async (id: string) => {
          await addToWishlist(id);
        });        localStorage.removeItem('wishlist');
        refetch();
      }
    }
  }, [isAuthenticated, addToWishlist, refetch]);

  const updateLocalWishlist = useCallback((newState: boolean) => {
    const localWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (newState) {
      if (!localWishlist.includes(productId)) {
        localStorage.setItem('wishlist', JSON.stringify([...localWishlist, productId]));
      }
    } else {
      localStorage.setItem('wishlist', JSON.stringify(localWishlist.filter((id: string) => id !== productId)));
    }
  }, [productId]);

  useEffect(() => {
    const updateWishlistState = () => {
      if (isAuthenticated && wishlistData) {
        const isInWishlist = wishlistData.wishlist.some((item) => item.product._id === productId);
        setIsWishlisted(isInWishlist);
      } else {
        const localWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setIsWishlisted(localWishlist.includes(productId));
      }
    };

    updateWishlistState();
    window.addEventListener('wishlistUpdated', updateWishlistState);

    return () => {
      window.removeEventListener('wishlistUpdated', updateWishlistState);
    };
  }, [productId, isAuthenticated, wishlistData]);

  const toggleWishlist = async () => {
    try {
      if (isAuthenticated) {
        if (isWishlisted) {
          await removeFromWishlist(productId).unwrap();
        } else {
          await addToWishlist(productId).unwrap();
        }
      }

      updateLocalWishlist(!isWishlisted);
      setIsWishlisted(!isWishlisted);
      window.dispatchEvent(new Event('wishlistUpdated'));
    } catch (error) {
      console.error('Failed to toggle wishlist', error);
      if (!isAuthenticated) {
        updateLocalWishlist(!isWishlisted);
        setIsWishlisted(!isWishlisted);
        window.dispatchEvent(new Event('wishlistUpdated'));
      }
    }
  };

  return { isWishlisted, toggleWishlist };
};