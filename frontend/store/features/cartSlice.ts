import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../data/products';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  notification: string | null;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  notification: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
        state.notification = `${action.payload.title} quantity updated`;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.notification = `${action.payload.title} added to cart`;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      state.items = state.items.filter(item => item.id !== action.payload);
      if (item) {
        state.notification = `${item.title} removed from cart`;
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== action.payload.id);
          state.notification = `${item.title} removed from cart`;
        } else {
          item.quantity = action.payload.quantity;
          state.notification = `${item.title} quantity updated`;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.notification = 'Cart cleared';
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  toggleCart, 
  closeCart,
  clearNotification
} = cartSlice.actions;

export default cartSlice.reducer; 