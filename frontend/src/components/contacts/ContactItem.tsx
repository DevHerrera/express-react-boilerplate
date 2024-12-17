import React from "react";
import ContactInterface from "../../models/contacts/contact.interface.ts";
import {
  MdContactPhone,
  MdEdit,
  MdDelete,
  MdPhone,
  MdEmail,
} from "react-icons/md";
interface ContactItemProps {
  contact: ContactInterface;
}

const ContactItem = ({ contact }: ContactItemProps) => {
  return (
    <li
      key={contact.id}
      className="bg-white w-96  rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center space-x-5">
        <MdContactPhone />
        <p className="text-xl font-semibold text-gray-800">
          {contact.fullName}
        </p>
      </div>

      <div className="items-center flex space-x-2">
        <MdPhone />
        <p className="text-xl font-semibold text-gray-800 ">{contact.phone}</p>
        <MdEmail />
        <p className="text-xl font-semibold text-gray-800">test@test.com</p>

        <MdEdit color="blue" />
        <MdDelete color="red" />
      </div>
    </li>
  );
};

export default ContactItem;
