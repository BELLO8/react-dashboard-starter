import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  carDocument,
  carFiles,
  getAllCars,
  getDriverVehicule,
} from "../../services/CarService";

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

export const document = createAsyncThunk("car/document", async (id) => {
  const response = await carDocument(id);
  return response.data;
});

export const getDriver = createAsyncThunk("car/getDriver", async (id) => {
  const response = await getDriverVehicule(id);
  return response.data;
});

const carSlice = createSlice({
  name: "car",
  initialState: {
    vehicules: [],
    drivers: [],
    carFiles: [],
    carDocuments: [],
    documentLoading: true,
    loading: true,
    fileLoading: true,
    driverLoading: true,
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
      })
      .addCase(document.fulfilled, (state, action) => {
        state.documentLoading = false;
        state.carDocuments = action.payload;
      })
      .addCase(getDriver.fulfilled, (state, action) => {
        state.driverLoading = false;
        state.drivers = action.payload;
      }),
});

export default carSlice.reducer;
