import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
  productList: [],
  loading: false,
};

const productSlice = createSlice({
  initialState: initialState,
  name: "products",
  reducers: {
    fetchLoading: (state) => {
      state.loading = true;
    },
    fetchSingleProduct: (state, { payload }) => {
      state.loading = false;
      state.product = payload;
    },
    fetchAllProduct: (state, { payload }) => {
      state.productList = payload;
      state.loading = false;
    },
  },
});

export const { fetchAllProduct, fetchSingleProduct, fetchLoading } =
  productSlice.actions;

export default productSlice.reducer;
