import React from "react";
import ContactList from "../../components/contacts/ContactList.tsx";
import useContacts from "../../hooks/contacts/useContact.tsx";

const Contacts = () => {
  const { contacts, error, loading } = useContacts();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1 class="mt-12 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        My contacts
      </h1>
      <ContactList contacts={contacts} />
    </div>
  );
};

export default Contacts;
