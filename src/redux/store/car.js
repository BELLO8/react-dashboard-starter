import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { carFiles, getAllCars } from "../../services/CarService";

export const getCars = createAsyncThunk("car/getCar", async (param) => {
  const response = await getAllCars({
    page: param.page,
    param: param.param,
    size: param.size,
  });
  return response.data;
});

export const files = createAsyncThunk("car/files", async (id) => {
  const response = await carFiles(id);
  return response.data;
});

const carSlice = createSlice({
  name: "car",
  initialState: {
    vehicules: [],
    carFiles: [],
    loading: true,
    fileLoading: true,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getCars.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicules = action.payload;
      })
      .addCase(files.fulfilled, (state, action) => {
        state.fileLoading = false;
        state.carFiles = action.payload;
      }),
});

export default carSlice.reducer;
