const CART_KEY = 'cart';

export const saveCartToLocalStorage = (cart: string[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const getCartFromLocalStorage = (): string[] => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const clearCartInLocalStorage = () => {
  localStorage.removeItem(CART_KEY);
};
