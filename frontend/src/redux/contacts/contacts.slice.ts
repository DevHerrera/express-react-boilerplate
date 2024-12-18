import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactState, Contact } from "./contacts.types";

const initialState: ContactState = {
  contacts: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    fetchContactsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchContactsSuccess(
      state,
      action: PayloadAction<{
        contacts: Contact[];
        currentPage: number;
        totalPages: number;
      }>
    ) {
      state.isLoading = false;
      state.contacts = action.payload.contacts;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    fetchContactsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const {
  fetchContactsStart,
  fetchContactsSuccess,
  fetchContactsFailure,
  setPage,
} = contactsSlice.actions;

export default contactsSlice.reducer;
