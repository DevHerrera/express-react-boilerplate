import ContactList from "../../components/contacts/ContactList.tsx";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchContacts } from "../../redux/contacts/contacts.thunks.ts";
import { RootState, AppDispatch } from "../../redux/store";
import { NavigateFunction } from "react-router-dom";

const Contacts: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { contacts, currentPage, totalPages, error } = useSelector(
    (state: RootState) => state.contacts
  );

  useEffect(() => {
    dispatch(fetchContacts(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div>
      <div class="flex justify-center items-center h-full">
        <h1 class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          My contacts
        </h1>
      </div>

      {error && (
        <div className="text-red-500 font-bold text-center">{error}</div>
      )}
      <ContactList
        contacts={contacts}
        dispatch={dispatch}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Contacts;