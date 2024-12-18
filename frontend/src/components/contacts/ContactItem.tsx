import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import DeleteContactModal from "./DeleteContactModal.tsx";
import ContactInterface from "../../models/contacts/contact.interface.ts";
import { MdEdit, MdDelete, MdPhone, MdEmail } from "react-icons/md";
import { AppDispatch, RootState } from "../../redux/store.ts";
import { useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contacts/contacts.thunks.ts";
import axios from "axios";

interface ContactItemProps {
  contact: ContactInterface;
  dispatch: AppDispatch;
}

const ContactItem = ({ contact, dispatch }: ContactItemProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  const handleEdit = (customerId: number) => {
    navigate(`/edit/${customerId}`);
  };
  const { currentPage } = useSelector((state: RootState) => state.contacts);

  const handleDelete = async (contactId: number) => {
    await axios.delete(`http://localhost:3080/contacts/${contactId}`);
    dispatch(fetchContacts(currentPage));
    setModalOpen(false);
  };

  const photoUrl = contact.photoUrl || "https://via.placeholder.com/150";

  return (
    <li
      key={contact.id}
      className="bg-white w-96  rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex space-x-5">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
          <img
            src={photoUrl}
            alt="profilePhoto"
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-xl font-semibold text-gray-800">
          {contact.fullName}
        </p>
      </div>

      <div className="items-center flex space-x-2">
        <div className="flex flex-col">
          <p className="flex flex-row items-center gap-2 text-md font-semibold text-gray-800 ">
            <MdPhone />
            {contact.phone}
          </p>
          <p className="flex flex-row items-center gap-2 text-md font-semibold text-gray-800 ">
            <MdEmail />
            {contact.email}
          </p>
        </div>
      </div>

      <button
        onClick={() => {
          handleEdit(contact.id);
        }}
      >
        <MdEdit color="blue" />
      </button>

      <button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <MdDelete color="red" />
      </button>

      <DeleteContactModal
        isOpen={isModalOpen}
        onConfirm={() => handleDelete(contact.id)}
        onCancel={() => setModalOpen(false)}
      />
    </li>
  );
};

export default ContactItem;
