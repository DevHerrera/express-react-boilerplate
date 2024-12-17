// redux/contacts/contactsSlice.ts
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
    addContact(state, action: PayloadAction<Contact>) {
      state.contacts.push(action.payload);
    },
    updateContact(state, action: PayloadAction<Contact>) {
      const index = state.contacts.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) state.contacts[index] = action.payload;
    },
    deleteContact(state, action: PayloadAction<number>) {
      state.contacts = state.contacts.filter((c) => c.id !== action.payload);
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
  addContact,
  updateContact,
  deleteContact,
  setPage,
} = contactsSlice.actions;

export default contactsSlice.reducer;
