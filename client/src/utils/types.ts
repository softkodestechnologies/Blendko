export interface ProductItemType {
  title: string;
  price: string;
  imgSrc: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  available_quantity: number;
  brand: string;
  colors: string[];
  discount: number;
  dress_style: string[];
  fashion_collection: string[];
  features: string[];
  gender: string;
  images: { url: string }[];
  measurement: string;
  num_of_reviews: number;
  ratings: number;
  reviews: any[];
  sizes: string[];
  technology: string[];
  updatedAt: string;
  user: string;
  isCustomizable: boolean;
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
  
  
  
  