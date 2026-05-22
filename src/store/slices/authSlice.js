import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../constants/apiConfig";

const getErrorMessage = (error, fallback) => {
  return error?.response?.data?.message || error?.message || fallback;
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      console.log("[REGISTER_API] Sending request to:", `${API_URL}/users/signup`);
      const res = await axios.post(`${API_URL}/users/signup`, userData);
      console.log("[REGISTER_API] Success response:", res.data);
      return res.data;
    } catch (error) {
      console.error("[REGISTER_API] FAILED! Full error object:", error);
      if (error?.response) {
        console.error("[REGISTER_API] Server responded with status:", error.response.status);
        console.error("[REGISTER_API] Server response data:", error.response.data);
      } else {
        console.error("[REGISTER_API] No server response (network error/timeout):", error.message);
      }
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Register failed"),
      );
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, rememberMe }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });

      const token = res.data?.token;

      if (token) {
        if (rememberMe) {
          localStorage.setItem("token", token);
        } else {
          localStorage.removeItem("token");
          sessionStorage.setItem("token", token);
        }
      }

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error, "Login failed"));
    }
  }
);

export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        return { token: null, user: null };
      }
      
      const res = await axios.get(`${API_URL}/users/get-info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { token, user: res.data?.user };
    } catch (error) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      return { token: null, user: null };
    }
  },
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
});

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/users/verify-otp`, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Verify OTP failed"),
      );
    }
  },
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (emailData, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/users/resend-otp`, emailData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Resend OTP failed"),
      );
    }
  },
);

export const getInfo = createAsyncThunk(
  "auth/getInfo",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.token;

      if (!token) {
        token = localStorage.getItem("token") || sessionStorage.getItem("token");
      }

      if (!token) {
        return thunkAPI.rejectWithValue("Token not found");
      }

      const res = await axios.get(`${API_URL}/users/get-info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Get user info failed")
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token || localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axios.patch(`${API_URL}/users/update-profile`, profileData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error, "Update profile failed"));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    isOtpVerified: false,
    appLoading: true,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;
      state.isOtpVerified = false;
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.token || null;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      })
      .addCase(initializeAuth.pending, (state) => {
        state.appLoading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.appLoading = false;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.token = null;
        state.user = null;
        state.appLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
        state.loading = false;
        state.isOtpVerified = false;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isOtpVerified = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          email: action.payload.email,
        };
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isOtpVerified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      })
      .addCase(resendOtp.pending, (state, action) => {
        state.loading = true;
        state.isOtpVerified = false;
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.isOtpVerified = false;
        state.user = {
          email: action.payload.email,
        };
        state.error = null;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getInfo.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
        state.error = null;
      })
      .addCase(getInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;