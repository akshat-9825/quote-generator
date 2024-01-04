import { configureStore } from "@reduxjs/toolkit";
import { Apis } from "../components/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import quoteSliceReducer from "../components/quoteSlice"; // Ensure proper import

export const store = configureStore({
  reducer: {
    [Apis.reducerPath]: Apis.reducer,
    quotes: quoteSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Apis.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
