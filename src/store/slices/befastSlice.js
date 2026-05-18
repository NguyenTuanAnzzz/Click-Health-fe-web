import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AI_API_URL } from "../../constants/apiConfig";

const getErrorMessage = (error, fallback) => {
  return error?.response?.data?.message || error?.message || fallback;
};

export const analyzeBalance = createAsyncThunk(
  "befast/analyzeBalance",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${AI_API_URL}/predict-balance`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error, "Không thể phân tích thăng bằng."));
    }
  }
);

export const analyzeFace = createAsyncThunk(
  "befast/analyzeFace",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${AI_API_URL}/predict-face`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error, "Không thể phân tích khuôn mặt."));
    }
  }
);

export const analyzeArm = createAsyncThunk(
  "befast/analyzeArm",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${AI_API_URL}/predict-arm`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error, "Không thể phân tích cánh tay."));
    }
  }
);

export const verifySpeech = createAsyncThunk(
  "befast/verifySpeech",
  async (text, thunkAPI) => {
    try {
      const response = await axios.post(`${AI_API_URL}/verify-speech`, { text });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error, "Không thể phân tích giọng nói."));
    }
  }
);

const befastSlice = createSlice({
  name: "befast",
  initialState: {
    results: {
      balance: null,
      eyes: null,
      face: null,
      arm: null,
      speech: null,
    },
    loading: false,
    error: null,
  },
  reducers: {
    saveEyesResult: (state, action) => {
      state.results.eyes = action.payload;
    },
    resetBefast: (state) => {
      state.results = {
        balance: null,
        eyes: null,
        face: null,
        arm: null,
        speech: null,
      };
      state.error = null;
      state.loading = false;
    },
    clearBefastError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Balance
      .addCase(analyzeBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(analyzeBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.results.balance = action.payload;
      })
      .addCase(analyzeBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Face
      .addCase(analyzeFace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(analyzeFace.fulfilled, (state, action) => {
        state.loading = false;
        state.results.face = action.payload;
      })
      .addCase(analyzeFace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Arm
      .addCase(analyzeArm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(analyzeArm.fulfilled, (state, action) => {
        state.loading = false;
        state.results.arm = action.payload;
      })
      .addCase(analyzeArm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Speech
      .addCase(verifySpeech.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifySpeech.fulfilled, (state, action) => {
        state.loading = false;
        state.results.speech = action.payload;
      })
      .addCase(verifySpeech.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { saveEyesResult, resetBefast, clearBefastError } = befastSlice.actions;
export default befastSlice.reducer;
