import ContactList from "../../components/contacts/ContactList.tsx";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchContacts } from "../../redux/contacts/contacts.thunks.ts";
import { RootState, AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const Contacts: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { contacts, currentPage, totalPages, error } = useSelector(
    (state: RootState) => state.contacts
  );

  const navigate = useNavigate();

  const handleAddNewContact = () => {
    navigate(`/add`);
  };

  useEffect(() => {
    dispatch(fetchContacts(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          My contacts
        </h1>
        <button
          onClick={handleAddNewContact}
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
        >
          Add new contact
        </button>
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
