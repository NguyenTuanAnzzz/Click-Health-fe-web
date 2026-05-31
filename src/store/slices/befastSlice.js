import { createSlice } from "@reduxjs/toolkit";

const emptyResults = () => ({
  balance: null,
  eyes: null,
  face: null,
  arm: null,
  speech: null,
});

const befastSlice = createSlice({
  name: "befast",
  initialState: {
    results: emptyResults(),
    loading: false,
    error: null,
  },
  reducers: {
    saveEyesResult: (state, action) => {
      state.results.eyes = action.payload;
      state.error = null;
    },
    saveBefastRealtimeResult: (state, action) => {
      const { testKey, result } = action.payload;
      if (!testKey || !result) return;
      state.results[testKey] = { ...result, realtime: true };
      state.loading = false;
      state.error = null;
    },
    resetBefast: (state) => {
      state.results = emptyResults();
      state.error = null;
      state.loading = false;
    },
    clearBefastError: (state) => {
      state.error = null;
    },
  },
});

export const {
  saveEyesResult,
  saveBefastRealtimeResult,
  resetBefast,
  clearBefastError,
} = befastSlice.actions;

export default befastSlice.reducer;
