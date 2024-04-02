import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDriver } from "../../services/Driver";
import {
  getCarByPartner,
  getDriverByPartner,
  getOrderPartner,
  getPartnerInfo,
  getPartners,
  partnerDocument,
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

export const getAllPartnerOrder = createAsyncThunk(
  "partner/getAllPartnerOrder",
  async (param) => {
    const response = await getOrderPartner({
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

export const document = createAsyncThunk("car/document", async (id) => {
  const response = await partnerDocument(id);
  return response.data;
});

export const partnerSlice = createSlice({
  name: "partner",
  initialState: {
    partner: [],
    infoPartner: {},
    document: [],
    cars: [],
    drivers: [],
    driver: [],
    order: [],
    loadDoc: true,
    loadingOrder: true,
    isloading: true,
    loadingInfo: true,
    loadingCars: true,
    loadingDriver: true,
    loadingDriverInfo: true,
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
        state.loadingInfo = false;
      })
      .addCase(getAllPartnerCar.fulfilled, (state, action) => {
        state.cars = action.payload;
        state.loadingCars = false;
      })
      .addCase(getAllPartnerDriver.fulfilled, (state, action) => {
        state.drivers = action.payload;
        state.loadingDriver = false;
      })
      .addCase(getAllPartnerOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loadingOrder = false;
      })
      .addCase(driverInfo.fulfilled, (state, action) => {
        state.driver = action.payload;
        state.loadingDriverInfo = false;
      })
      .addCase(document.fulfilled, (state, action) => {
        state.document = action.payload;
        state.loadDoc = false;
      });
  },
});

export default partnerSlice.reducer;
