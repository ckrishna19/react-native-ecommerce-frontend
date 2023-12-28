import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allOrder: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderLoading: (state) => {
      state.loading = true;
    },
    newOrder: (state, { payload }) => {
      state.loading = false;
      state.allOrder.push(payload);
    },
    getAllOrder: (state, { payload }) => {
      state.loading = false;
      state.allOrder = payload;
    },
  },
});

export const { newOrder, orderLoading, getAllOrder } = orderSlice.actions;

export default orderSlice.reducer;
