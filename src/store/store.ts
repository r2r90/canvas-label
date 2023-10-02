import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./app.slice";

export const store = configureStore({
  reducer: {
    [appSlice.name]: appSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
