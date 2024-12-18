import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchContactsStart,
  fetchContactsSuccess,
  fetchContactsFailure,
} from "./contacts.slice.ts";
import axios from "axios";

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
