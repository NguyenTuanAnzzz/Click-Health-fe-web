import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import placeReducer from "./slices/placeSlice";
import historyReducer from "./slices/historySlice";
import befastReducer from "./slices/befastSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    place: placeReducer,
    history: historyReducer,
    befast: befastReducer,
  },
});
