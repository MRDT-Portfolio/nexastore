import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "./types";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<
        Omit<CartItem, "quantity"> & {
          quantity: number;
        }
      >,
    ) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        return;
      }

      state.items.push(action.payload);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        id: number;
        quantity: number;
      }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (!item) {
        return;
      }

      if (action.payload.quantity <= 0) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
        return;
      }

      item.quantity = action.payload.quantity;
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
