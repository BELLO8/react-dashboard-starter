import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDriver } from "../../services/Driver";
import {
  getCarByPartner,
  getDriverByPartner,
  getPartnerInfo,
  getPartners,
} from "../../services/PartenaireService";

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

export const getAllPartnerCar = createAsyncThunk(
  "partner/getAllPartnerCar",
  async (param) => {
    const response = await getCarByPartner({
      id: param.id,
      page: param.page,
      param: param.param,
      size: param.size,
    });
    return response.data;
  }
);

export const getAllPartnerDriver = createAsyncThunk(
  "partner/getAllPartnerDriver",
  async (param) => {
    const response = await getDriverByPartner({
      id: param.id,
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

export const driverInfo = createAsyncThunk(
  "driverInfo/getPartnerDriverInfo",
  async (id) => {
    const response = await getDriver(id);
    return response.data;
  }
);

export const partnerSlice = createSlice({
  name: "partner",
  initialState: {
    partner: [],
    infoPartner: {},
    cars: [],
    drivers: [],
    driver: [],
    isloading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPartner.fulfilled, (state, action) => {
        state.partner = action.payload;
        state.isloading = false;
      })
      .addCase(partnerInfo.fulfilled, (state, action) => {
        state.infoPartner = action.payload;
        state.isloading = true;
      })
      .addCase(getAllPartnerCar.fulfilled, (state, action) => {
        state.cars = action.payload;
        state.isloading = true;
      })
      .addCase(getAllPartnerDriver.fulfilled, (state, action) => {
        state.drivers = action.payload;
        state.isloading = true;
      })
      .addCase(driverInfo.fulfilled, (state, action) => {
        state.driver = action.payload;
        state.isloading = true;
      });
  },
});

export default partnerSlice.reducer;
