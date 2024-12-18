import ContactItem from "./ContactItem.tsx";
import ContactInterface from "../../models/contacts/contact.interface.ts";
import React from "react";
import { AppDispatch } from "../../redux/store.ts";
import { ContactPagination } from "./ContactPagination.tsx";

interface ContactListProps {
  contacts: ContactInterface[];
  currentPage: number;
  totalPages: number;
  dispatch: AppDispatch;
}

const ContactList = ({
  contacts,
  totalPages,
  currentPage,
  dispatch,
}: ContactListProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center h-screen overflow-y-auto max-h-[500px]">
        <ul className="space-y-1">
          {contacts.map((contact) => (
            <ContactItem contact={contact} />
          ))}
        </ul>
      </div>
      <ContactPagination
        dispatch={dispatch}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default ContactList;