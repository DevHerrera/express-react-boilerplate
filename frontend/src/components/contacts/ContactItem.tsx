import React from "react";
import TaskI from "../../models/tasks/task.interface.ts";
import ContactInterface from "../../models/contacts/contact.interface.ts";

interface ContactItemProps {
  contact: ContactInterface;
}

const ContactItem = ({ contact }: ContactItemProps) => {
  return (
    <li
      key={contact.id}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex space-x-4">
        <p className="text-xl text-gray-600">{contact.id}</p>
        <p className="text-xl font-semibold text-gray-800">
          {contact.fullName}:
        </p>
        <p className="text-xl font-semibold text-gray-800">{contact.email}</p>
        <p className="text-xl font-semibold text-gray-800">{contact.phone}</p>
      </div>
    </li>
  );
};

export default ContactItem;
