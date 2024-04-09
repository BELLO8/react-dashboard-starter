import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { avis } from "../../services/avis";

export const ListAvis = createAsyncThunk("ListAvis/Avis", async () => {
  const response = await avis();
  return response.data;
});

const avisSlice = createSlice({
  name: "avis",
  initialState: {
    avis: [],
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(ListAvis.fulfilled, (state, { payload }) => {
      state.avis = payload;
      state.loading = false;
    }),
});

export default avisSlice.reducer;
