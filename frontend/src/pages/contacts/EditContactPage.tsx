import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "../../redux/store.ts";
import { useParams } from "react-router-dom";
import axios from "axios";
import ContactInterface from "../../models/contacts/contact.interface.ts";
import { fetchContactsFailure } from "../../redux/contacts/contacts.slice.ts";
import ContactForm from "../../components/contacts/ContactForm.tsx";

const EditContactPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const [contact, setContact] = React.useState<ContactInterface | undefined>(
    undefined
  );

  const stateContact = useSelector((state: RootState) =>
    state.contacts.contacts.find((c) => c.id === Number(id))
  );

  const fetchContact = async () => {
    if (stateContact) {
      setContact(stateContact);
      return;
    }
    try {
      const response = await axios(`http://localhost:3080/contacts/${id}`);
      setContact(response.data);
    } catch (error: any) {
      dispatch(fetchContactsFailure(error.message));
    }
  };

  useEffect(() => {
    fetchContact();
  }, [id]);

  return (
    <div>
      <div className="flex justify-center items-center h-full">
        <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Edit {contact?.fullName}
        </h1>
      </div>

      <ContactForm dispatch={dispatch} contact={contact} formAction="update" />
    </div>
  );
};

export default EditContactPage;
