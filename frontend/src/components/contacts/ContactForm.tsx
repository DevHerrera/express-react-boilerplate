import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import ContactInterface from "../../models/contacts/contact.interface";
import Notification, { showNotification } from "../common/Notification.tsx";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface FormProps {
  fullName: string;
  email?: string;
  phone: string;
  profilePhoto?: File | null;
}

// Validation schema with Yup
const schema = yup
  .object({
    fullName: yup.string().required("Full name is required"),
    email: yup.string().email("Please enter a valid email").optional(),
    phone: yup
      .string()
      .matches(/^[+-]?\d+$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    photoUrl: yup.mixed().optional(),
  })
  .required();

interface ContactFormProps {
  formAction: "create" | "update";
  contact?: ContactInterface;
}

const ContactForm: React.FC = ({ formAction, contact }: ContactFormProps) => {
  console.log({ formAction });

  const navigate = useNavigate();

  const handleBackToList = (customerId: number) => {
    navigate(`/`);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
    defaultValues: { fullName: contact?.fullName },
  });

  // Populate form fields when `contact` changes
  React.useEffect(() => {
    if (contact) {
      setValue("fullName", contact.fullName);
      setValue("email", contact.email || "");
      setValue("phone", contact.phone);
    }
  }, [contact, setValue]);

  const onSubmit = async (data: FormProps) => {
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("phone", data.phone);
      if (data.email) {
        formData.append("email", data.email);
      }
      if (data.profilePhoto) {
        formData.append("image", data.profilePhoto);
      }

      if (formAction === "create") {
        await axios.post("http://localhost:3080/contacts", formData);
      } else {
        await axios.patch(
          `http://localhost:3080/contacts/${contact?.id}`,
          formData
        );
      }

      showNotification();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setValue("profilePhoto", file);
  };

  return (
    <div className="justify-center max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            {...register("fullName")}
            type="text"
            id="fullName"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email (Optional)
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            {...register("phone")}
            type="text"
            id="phone"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="profilePhoto"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Photo (Optional)
          </label>
          <input
            type="file"
            id="profilePhoto"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500"
          />

          {errors.profilePhoto && (
            <p className="text-red-500 text-sm">
              {errors.profilePhoto.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
      <div className="mt-5 flex items-center space-x-2">
        <button onClick={handleBackToList} className="text-xl">
          Back to list
        </button>
        <MdArrowBack />
      </div>
      <Notification
        text={
          formAction === "create"
            ? "Contact created successfully"
            : "Contact updated successfully"
        }
        color="blue"
      />
      <Notification text={"Unexpected error occurred"} color="red" />
    </div>
  );
};

export default ContactForm;
