import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contacts/contacts.slice.ts";

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
