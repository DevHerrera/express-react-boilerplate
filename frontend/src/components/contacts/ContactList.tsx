import React from "react";
import ContactItem from "./ContactItem.tsx";
import ContactInterface from "../../models/contacts/contact.interface.ts";

interface ContactListProps {
  contacts: ContactInterface[];
}

const ContactList = ({ contacts }: ContactListProps) => {
  return (
    <ul className="space-y-4">
      {contacts.map((contact) => (
        <ContactItem contact={contact} />
      ))}
    </ul>
  );
};

export default ContactList;
