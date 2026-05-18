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
      return thunkAPI.rejectWithValue(getErrorMessage(error, "Save history failed"));
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
  },
  reducers: {
    clearHistoryError: (state) => {
      state.error = null;
      state.saveError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch History
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
      // Save History
      .addCase(saveHistory.pending, (state) => {
        state.saveLoading = true;
        state.saveError = null;
      })
      .addCase(saveHistory.fulfilled, (state, action) => {
        state.saveLoading = false;
        state.saveError = null;
        // Optionally prepend the new history item to the list
        if (action.payload?.history) {
          state.data.unshift(action.payload.history);
        }
      })
      .addCase(saveHistory.rejected, (state, action) => {
        state.saveLoading = false;
        state.saveError = action.payload;
      });
  },
});

export const { clearHistoryError } = historySlice.actions;
export default historySlice.reducer;
