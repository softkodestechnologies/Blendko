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

let baseUrl = 'https://blendko.onrender.com/api/v1';



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
      const res = await fetch(
        `${baseUrl}/product?${new URLSearchParams(payload).toString()}`
      );
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
        productExists.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state: UserState, action: PayloadAction<any>) => {
      const item = state.cart.find((x) => x._id === action.payload._id);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state: UserState, action: PayloadAction<any>) => {
      const item = state.cart.find((x) => x._id === action.payload);
      if (item) {
        item.quantity--;
      }
    },
    deleteItem: (state: UserState, action: PayloadAction<any>) => {
      const item = state.cart.find((x) => x._id === action.payload);
      if (item) {
        state.cart = state.cart.filter((x) => x._id !== action.payload._id);
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
  incrementQuantity,
  decrementQuantity,
  deleteItem,
  checkout,
} = userSlice.actions;
export default userSlice.reducer;

