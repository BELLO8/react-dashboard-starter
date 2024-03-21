import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDrivers } from "../../services/Driver";

export const getMoreDrivers = createAsyncThunk(
  "car/carCategory",
  async (param) => {
    const response = await getDrivers({
      page: param.page,
      param: param.param,
      size: param.size,
    });
    return response.data;
  }
);

const driverSlice = createSlice({
  name: "driver",
  initialState: {
    driverListe: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(getMoreDrivers.fulfilled, (state, action) => {
      state.loading = true;
      state.driverListe = action.payload;
    }),
});

export default driverSlice.reducer;
