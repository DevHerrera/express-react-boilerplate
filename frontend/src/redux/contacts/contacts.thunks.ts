import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchContactsStart,
  fetchContactsSuccess,
  fetchContactsFailure,
  createContactSuccess,
  updateContactSuccess,
} from "./contacts.slice.ts";
import axios from "axios";

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (payload: { form: FormData; id: number }, { dispatch }) => {
    dispatch(fetchContactsStart());
    try {
      await axios.patch(
        `http://localhost:3080/contacts/${payload.id}`,
        payload.form
      );
      dispatch(updateContactSuccess());
    } catch (error: any) {
      dispatch(fetchContactsFailure(error.message));
    }
  }
);

export const createContact = createAsyncThunk(
  "contacts/createContact",
  async (payload: FormData, { dispatch }) => {
    dispatch(fetchContactsStart());
    try {
      await axios.post("http://localhost:3080/contacts", payload);
      dispatch(createContactSuccess());
    } catch (error: any) {
      dispatch(fetchContactsFailure(error.message));
    }
  }
);

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (page: number, { dispatch }) => {
    dispatch(fetchContactsStart());
    try {
      const response = await axios(
        `http://localhost:3080/contacts?page=${page}`
      );
      const data = await response.data;

      dispatch(
        fetchContactsSuccess({
          contacts: data.data,
          currentPage: data.page,
          totalPages: data.totalPages,
        })
      );
    } catch (error: any) {
      dispatch(fetchContactsFailure(error.message));
    }
  }
);
