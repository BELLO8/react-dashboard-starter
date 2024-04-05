import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { counter, statSales } from "../../services/statService";

export const StateCounter = createAsyncThunk(
  "stats/counter",
  async (params) => {
    const response = await counter({ date: params.date });
    return response.data;
  }
);

export const StatsFilter = createAsyncThunk(
  "stats/filterStats",
  async (params) => {
    const response = await statSales({
      periode: params.period,
      mois: params.mois,
      annee: params.annee,
    });
    return response.data;
  }
);

const stateSlice = createSlice({
  name: "state",
  initialState: {
    counters: [],
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(StateCounter.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.counters = payload;
      })
      .addCase(StatsFilter.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.counters = payload;
      }),
});

export default stateSlice.reducer;
