import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../constants/apiConfig";

const getErrorMessage = (error, fallback) => {
  return error?.response?.data?.message || error?.message || fallback;
};

const NEARBY_RADIUS_METERS = 20000;

export const getNearbyHospital = createAsyncThunk(
  "place/getNearbyHospital",
  async ({ lat, lng, page, limit, radiusMeters = NEARBY_RADIUS_METERS }, thunkAPI) => {
    try {
      const res = await axios.get(
        `${API_URL}/places/nearby-hospitals?lat=${lat}&lng=${lng}&page=${page}&limit=${limit}&radius=${radiusMeters}`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Get Hospital failed"),
      );
    }
  },
);

const placeSlice = createSlice({
  name: "place",
  initialState: {
    hospitals: [],
    hospitalsInRadius: [],
    loading: null,
    error: null,
    pages: null,
    totalItems: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNearbyHospital.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.hospitalsInRadius = [];
      })
      .addCase(getNearbyHospital.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.hospitals = action.payload.hospitals || [];
        state.hospitalsInRadius = action.payload.hospitalsInRadius || [];
        state.pages = action.payload.totalPages ?? 1;
        state.totalItems = action.payload.totalItems ?? 0;
      })
      .addCase(getNearbyHospital.rejected, (state, action) =>{
        state.loading = false;
        state.error = action.payload || action.error?.message
      })
  },
});

export const { clearError } = placeSlice.actions;
export default placeSlice.reducer;
