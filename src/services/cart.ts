import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { CartProduct } from './types';

interface CartState {
  products: CartProduct[]
}

const initialState: CartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartProduct>) => {
      const newCartProduct = action.payload;
      const cart = [...state.products];
      const cartProduct = cart.find(
        ({ productId }) => productId === newCartProduct.productId,
      );

      if (cartProduct) {
        cartProduct.quantity += newCartProduct.quantity;
      } else {
        cart.push(newCartProduct);
      }
      state.products = cart;
    },
    changeProductQuantity: (state, action: PayloadAction<CartProduct>) => {
      const newCartProduct = action.payload;
      const cart = [...state.products];
      const cartProduct = cart.find(
        ({ productId }) => productId === newCartProduct.productId,
      );

      if (cartProduct) {
        cartProduct.quantity = newCartProduct.quantity;
      }

      state.products = cart;
    },
    removeProduct: (state, action: PayloadAction<CartProduct['productId']>) => {
      const cart = [...state.products];
      const index = cart.findIndex(
        ({ productId }) => productId === action.payload,
      );

      if (index > -1) {
        cart.splice(index, 1);
      }

      state.products = cart;
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  addProduct, removeProduct, changeProductQuantity, clearCart,
} = cartSlice.actions;

export const selectProducts = (state: RootState) => state.cart.products;

export default cartSlice.reducer;
