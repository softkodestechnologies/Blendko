// types.ts
export interface ProductItemType {
  title: string;
  price: string;
  imgSrc: string;
}


export interface Product {
    _id: string;
    name: string;
    price: number;
    images: { _id: string; public_id: string; url: string }[];
    ratings: number;
    category: string;
    num_of_reviews: number;
    reviews: any[];
    measurement: string;
    quantity: number;
    available_quantity: number;
    discount: number;
    features: string[];
    user: string;
    description: string;
  }
  
  export interface CartItem {
    _id: string;
    product: string;
    quantity: number;
  }
  
  
  export interface CartResponse {
    success: boolean;
    cart: CartItem[];
  }
  
  export interface LoginResponse {
    success: boolean;
    token: string;
    user: {
      _id: string;
      name: string;
      email: string;
      password: string;
      roles: string[];
      orders: any[];
      notificationPreferences: any[];
      cart: CartItem[];
      activityLog: any[];
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  }
  
  
  
  