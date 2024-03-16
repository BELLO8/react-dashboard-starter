import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPartnerInfo, getPartners } from "../../services/PartenaireService";

export const getAllPartner = createAsyncThunk(
  "partner/getAllPartner",
  async (param) => {
    const response = await getPartners({
      page: param.page,
      param: param.param,
      size: param.size,
    });
    return response.data;
  }
);

export const partnerInfo = createAsyncThunk(
  "partner/getPartner",
  async (id) => {
    const response = await getPartnerInfo(id);
    return response;
  }
);

export const partnerSlice = createSlice({
  name: "partner",
  initialState: {
    partner: [],
    infoPartner: {},
    isloading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPartner.fulfilled, (state, action) => {
        state.partner = action.payload;
        state.isloading = true;
      })
      .addCase(partnerInfo.fulfilled, (state, action) => {
        state.infoPartner = action.payload;
        state.isloading = true;
      });
  },
});

export default partnerSlice.reducer;
