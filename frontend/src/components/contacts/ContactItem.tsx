import React from "react";
import { useNavigate } from "react-router-dom";

import ContactInterface from "../../models/contacts/contact.interface.ts";
import { MdEdit, MdDelete, MdPhone, MdEmail } from "react-icons/md";
interface ContactItemProps {
  contact: ContactInterface;
}

const ContactItem = ({ contact }: ContactItemProps) => {
  const navigate = useNavigate();

  const handleEdit = (customerId: number) => {
    navigate(`/edit/${customerId}`);
  };

  const photoUrl = contact.photoUrl || "https://via.placeholder.com/150";

  return (
    <li
      key={contact.id}
      className="bg-white w-96  rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center space-x-5">
        <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
          <img
            src={photoUrl}
            alt="profilePhoto"
            class="w-full h-full object-cover"
          />
        </div>

        <p className="text-xl font-semibold text-gray-800">
          {contact.fullName}
        </p>
      </div>

      <div className="items-center flex space-x-2">
        <MdPhone />
        <p className="text-xl font-semibold text-gray-800 ">{contact.phone}</p>
        <MdEmail />
        <p className="text-xl font-semibold text-gray-800">test@test.com</p>

        <button
          onClick={() => {
            handleEdit(contact.id);
          }}
        >
          <MdEdit color="blue" />
        </button>

        <MdDelete color="red" />
      </div>
    </li>
  );
};

export default ContactItem;
