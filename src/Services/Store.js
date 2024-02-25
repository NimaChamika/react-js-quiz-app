import { configureStore, createSlice } from "@reduxjs/toolkit";
import firebaseApi from "./FirebaseApi";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    iframeEvent: null,
  },
  reducers: {
    setIframeEvent: (state, action) => {
      state.iframeEvent = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    home: homeSlice.reducer,
    [firebaseApi.reducerPath]: firebaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(firebaseApi.middleware),
});

export const homeActions = homeSlice.actions;

export default store;
