import { configureStore } from "@reduxjs/toolkit";
import ItemSlicer from "./reducer";
export const store = configureStore({
  reducer: {
    item: ItemSlicer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
