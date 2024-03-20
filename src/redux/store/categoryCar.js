import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCarCategory } from "../../services/CarCategory";

export const getCategory = createAsyncThunk(
  "car/carCategory",
  async (param) => {
    const response = await getCarCategory({
      page: param.page,
      param: param.param,
      size: param.size,
    });
    return response.data;
  }
);

export const carCategorySlice = createSlice({
  name: "carCategory",
  initialState: {
    categoryCar: [],
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.categoryCar = action.payload;
      state.loading = false;
    });
  },
});
export default carCategorySlice.reducer;
