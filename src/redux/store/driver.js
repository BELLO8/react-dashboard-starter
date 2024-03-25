import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDrivers, getPieces } from "../../services/Driver";

export const getMoreDrivers = createAsyncThunk(
  "driver/getDrivers",
  async (param) => {
    const response = await getDrivers({
      page: param.page,
      param: param.param,
      size: param.size,
    });
    return response.data;
  }
);

export const getDriverPieces = createAsyncThunk(
  "driver/DriverPieces",
  async (id) => {
    const response = await getPieces(id);
    return response.data;
  }
);

const driverSlice = createSlice({
  name: "driver",
  initialState: {
    driverListe: [],
    listePieces: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getMoreDrivers.fulfilled, (state, action) => {
        state.loading = true;
        state.driverListe = action.payload;
      })
      .addCase(getDriverPieces.fulfilled, (state, action) => {
        state.loading = true;
        state.listePieces = action.payload;
      }),
});

export default driverSlice.reducer;
