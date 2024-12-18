import React from "react";

import ContactForm from "../../components/contacts/ContactForm.tsx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store.ts";

const AddContactPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <div>
      <div className="flex justify-center items-center h-full">
        <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Add new contact
        </h1>
      </div>
      <ContactForm dispatch={dispatch} formAction="create" />
    </div>
  );
};

export default AddContactPage;
