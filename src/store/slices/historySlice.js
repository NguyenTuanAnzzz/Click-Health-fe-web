import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../constants/apiConfig";

const getErrorMessage = (error, fallback) => {
  return error?.response?.data?.message || error?.message || fallback;
};

export const fetchMyHistory = createAsyncThunk(
  "history/fetchMyHistory",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return thunkAPI.rejectWithValue("No authentication token found");
      }

      const res = await axios.get(`${API_URL}/history/my-history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error, "Fetch history failed"));
    }
  }
);

export const saveHistory = createAsyncThunk(
  "history/saveHistory",
  async (historyData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return thunkAPI.rejectWithValue("No authentication token found");
      }

      const res = await axios.post(`${API_URL}/history/save`, historyData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      // Handle specific HTTP status codes
      if (error.response?.status === 403) {
        // 403 Forbidden - likely token expired or insufficient permissions
        console.error('403 Forbidden: Your session may have expired. Please log in again.');
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        return thunkAPI.rejectWithValue("Session expired. Please log in again.");
      }
      
      if (error.response?.status === 401) {
        // 401 Unauthorized
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        return thunkAPI.rejectWithValue("Authentication failed. Please log in again.");
      }
      
      return thunkAPI.rejectWithValue(getErrorMessage(error, "Save history failed"));
    }
  }
);

export const fetchMyBmiHistory = createAsyncThunk(
  "history/fetchMyBmiHistory",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return thunkAPI.rejectWithValue("No authentication token found");
      }

      const res = await axios.get(`${API_URL}/history/bmi`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error, "Fetch BMI history failed"));
    }
  }
);

export const saveBmiHistory = createAsyncThunk(
  "history/saveBmiHistory",
  async (bmiData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return thunkAPI.rejectWithValue("No authentication token found");
      }

      const res = await axios.post(`${API_URL}/history/bmi`, bmiData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      // Handle specific HTTP status codes
      if (error.response?.status === 403) {
        console.error('403 Forbidden: Your session may have expired. Please log in again.');
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        return thunkAPI.rejectWithValue("Session expired. Please log in again.");
      }
      
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        return thunkAPI.rejectWithValue("Authentication failed. Please log in again.");
      }
      
      return thunkAPI.rejectWithValue(getErrorMessage(error, "Save BMI history failed"));
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState: {
    data: [],
    loading: false,
    saveLoading: false,
    error: null,
    saveError: null,

    // BMI History States
    bmiData: [],
    bmiLoading: false,
    bmiSaveLoading: false,
    bmiError: null,
    bmiSaveError: null,
  },
  reducers: {
    clearHistoryError: (state) => {
      state.error = null;
      state.saveError = null;
      state.bmiError = null;
      state.bmiSaveError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch BeFast History
      .addCase(fetchMyHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.history || [];
        state.error = null;
      })
      .addCase(fetchMyHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Save BeFast History
      .addCase(saveHistory.pending, (state) => {
        state.saveLoading = true;
        state.saveError = null;
      })
      .addCase(saveHistory.fulfilled, (state, action) => {
        state.saveLoading = false;
        state.saveError = null;
        if (action.payload?.history) {
          state.data.unshift(action.payload.history);
        }
      })
      .addCase(saveHistory.rejected, (state, action) => {
        state.saveLoading = false;
        state.saveError = action.payload;
      })

      // Fetch BMI History
      .addCase(fetchMyBmiHistory.pending, (state) => {
        state.bmiLoading = true;
        state.bmiError = null;
      })
      .addCase(fetchMyBmiHistory.fulfilled, (state, action) => {
        state.bmiLoading = false;
        state.bmiData = action.payload?.history || [];
        state.bmiError = null;
      })
      .addCase(fetchMyBmiHistory.rejected, (state, action) => {
        state.bmiLoading = false;
        state.bmiError = action.payload;
      })
      // Save BMI History
      .addCase(saveBmiHistory.pending, (state) => {
        state.bmiSaveLoading = true;
        state.bmiSaveError = null;
      })
      .addCase(saveBmiHistory.fulfilled, (state, action) => {
        state.bmiSaveLoading = false;
        state.bmiSaveError = null;
        if (action.payload?.history) {
          state.bmiData.unshift(action.payload.history);
        }
      })
      .addCase(saveBmiHistory.rejected, (state, action) => {
        state.bmiSaveLoading = false;
        state.bmiSaveError = action.payload;
      });
  },
});

export const { clearHistoryError } = historySlice.actions;
export default historySlice.reducer;
