import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCustomer,
  getCustomerInfo,
  orderListByCustomer,
} from "../../services/CustomerService";

export const getAllCustomer = createAsyncThunk(
  "customer/getCustomer",
  async (param) => {
    const response = await getCustomer({
      page: param.page,
      param: param.param,
      size: param.size,
    });
    return response.data;
  }
);

export const customerInfo = createAsyncThunk(
  "customer/CustomerInfo",
  async (id) => {
    const response = await getCustomerInfo(id);
    return response;
  }
);

export const getAllCustomerOrder = createAsyncThunk(
  "customer/getCustomerOrder",
  async (param) => {
    const response = await orderListByCustomer({
      id: param.id,
      page: param.page,
      param: param.param,
      size: param.size,
    });
    return response.data;
  }
);

export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customer: [],
    selectCustomer: {},
    order: [],
    loading: true,
  },
  reducers: {
    selectCustomer: (state, action) => {
      state.selectCustomer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomer.fulfilled, (state, action) => {
        state.customer = action.payload;
        state.loading = false;
      })
      .addCase(getAllCustomerOrder.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(customerInfo.fulfilled, (state, action) => {
        state.selectCustomer = action.payload;
      });
  },
});
export const { selectCustomer } = customerSlice.actions;
export default customerSlice.reducer;
