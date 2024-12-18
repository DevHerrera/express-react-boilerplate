import React from "react";

import ContactForm from "../../components/contacts/ContactForm.tsx";

const AddContactPage: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-full">
        <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Add new contact
        </h1>
      </div>

      <ContactForm formAction="create" />
    </div>
  );
};

export default AddContactPage;
