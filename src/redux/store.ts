import { configureStore } from "@reduxjs/toolkit";
import { dialogSlice, update } from "./diolog_updater/diaolog_updater_slice";

export const store = configureStore({
  reducer: {
    dialog: dialogSlice.reducer, // Use dialogSlice.reducer for clarity
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
