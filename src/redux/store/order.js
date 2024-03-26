import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrders, getOrdersByDriver } from "../../services/OrderService";

export const getAllOrder = createAsyncThunk("order/getOrder", async (param) => {
  const response = await getOrders({
    page: param.page,
    param: param.param,
    size: param.size,
  });
  return response.data;
});

export const getAllOrderByDriver = createAsyncThunk(
  "orderListe/getOrderByDriver",
  async (param) => {
    const response = await getOrdersByDriver({
      id: param.id,
      page: param.page,
      param: param.param,
      size: param.size,
    });
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    driverOrder: [],
    loading: true,
    loadingOrder: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loading = false;
      })
      .addCase(getAllOrderByDriver.fulfilled, (state, action) => {
        state.driverOrder = action.payload;
        state.loadingOrder = false;
      });
  },
});
export default orderSlice.reducer;
