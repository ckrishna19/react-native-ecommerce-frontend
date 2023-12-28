import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const existed = state.cart.find(
        (x) => x.id === payload.id && x.cartBy === payload.cartBy
      );

      if (existed) {
        existed.quantity += 1;
      } else {
        state.cart.push(payload);
      }

      console.log(state.cart.length);
    },

    removeAllCartItem: (state) => {
      state.cart = [];
    },

    removeById: (state, { payload }) => {
      state.cart = state.cart.filter((x) => x.id !== payload);
    },
    decreseQuantity: (state, { payload }) => {
      const existed = state.cart.find((x) => x.id === payload);

      if (existed && existed.quantity > 1) {
        existed.quantity--;
      }
    },
    increaseQuantity: (state, { payload }) => {
      const existed = state.cart.find((x) => x.id === payload);

      if (existed) {
        existed.quantity++;
      }
    },
  },
});

export const {
  addToCart,
  removeAllCartItem,
  removeById,
  decreseQuantity,
  increaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
