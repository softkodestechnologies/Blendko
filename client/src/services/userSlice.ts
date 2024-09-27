import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface UserState {
  user: any;
  cart: any[];
  products: {
    isLoading: boolean;
    error: string | null;
    data: any[];
  };
}

let baseUrl;

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:8080/api/v1';
} else {
  baseUrl = 'https://blendko.onrender.com/api/v1';
}

let user;

if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
  user = JSON.parse(localStorage.getItem('user')!) || null;
}

let cart = [];

if (typeof localStorage !== 'undefined' && localStorage.getItem('cartItems')) {
  cart = JSON.parse(localStorage.getItem('cartItems')!);
}

const initialState: UserState = {
  user: user,
  cart: cart,
  products: {
    isLoading: false,
    error: null,
    data: [],
  },
};

interface FetchProductsPayload {
  [key: string]: string;
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (payload: FetchProductsPayload, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      
      for (const [key, value] of Object.entries(payload)) {
        if (key === 't-shirt' || key === 'pants' || key === 'shoes' || key === 'accessories') {
          // This is a subcategory
          queryParams.append('subcategory', key);
          queryParams.append('attributes', value);
        } else {
          queryParams.append(key, value);
        }
      }

      const res = await fetch(`${baseUrl}/product?${queryParams.toString()}`);
      const data = await res.json();
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message) as unknown;
      }
      return rejectWithValue('An unknown error occurred') as unknown;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<any>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },

    updateUser: (state, action: PayloadAction<any>) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    },

    logOut: (state: UserState) => {
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },

    addToCart: (state: UserState, action: PayloadAction<any>) => {
      const productExists = state.cart.find(
        (x) => x._id === action.payload._id
      );

      if (productExists) {
        productExists.quantity += action.payload.quantity;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cart));
      console.log(JSON.stringify(state.cart))
      if(state.user) {
        state.user.cart = state.cart;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },

    updateCartItemQuantity: (state: UserState, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.cart.find((x) => x._id === action.payload.productId);
      if (item) {
        item.quantity = action.payload.quantity;
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cart));

      if (state.user) {
        state.user.cart = state.cart;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },

    incrementQuantity: (state: UserState, action: PayloadAction<any>) => {
      const item = state.cart.find((x) => x._id === action.payload._id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    decrementQuantity: (state: UserState, action: PayloadAction<any>) => {
      const item = state.cart.find((x) => x._id === action.payload);
      if (item) {
        item.quantity--;
      }
    },

    clearCart: (state: UserState) => {
      state.cart = [];
      localStorage.setItem('cartItems', JSON.stringify([]));
      if (state.user) {
        state.user.cart = [];
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },

    deleteItem: (state: UserState, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((x) => x._id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cart));
    
      if (state.user) {
        state.user.cart = state.cart;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    checkout: (state: UserState) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state: UserState) => {
      state.products.isLoading = true;
      state.products.error = null;
      state.products.data = [];
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state: UserState, action: PayloadAction<any>) => {
        state.products.isLoading = false;
        state.products.error = null;
        state.products.data = action.payload;
      }
    );
    builder.addCase(
      fetchProducts.rejected,
      (state: UserState, action: PayloadAction<any>) => {
        state.products.isLoading = false;
        state.products.error = action.payload as string;
        state.products.data = [];
      }
    );
  },
});

export const {
  setUser,
  updateUser,
  logOut,
  addToCart,
  updateCartItemQuantity,
  incrementQuantity,
  decrementQuantity,
  deleteItem,
  clearCart,
  checkout,
} = userSlice.actions;

export default userSlice.reducer;
