import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrders } from "../../services/OrderService";

export const getAllOrder = createAsyncThunk("order/getOrder", async (param) => {
  const response = await getOrders({
    page: param.page,
    param: param.param,
    size: param.size,
  });
  return response.data;
});

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOrder.fulfilled, (state, action) => {
      state.order = action.payload;
      state.loading = false;
    });
  },
});
export default orderSlice.reducer;
