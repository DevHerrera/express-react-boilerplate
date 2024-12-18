import { useState, useEffect } from "react";
import axios from "axios";
import ContactInterface from "../../models/contacts/contact.interface";

interface UseContactsResponse {
  contacts: ContactInterface[];
  error: Error | null;
  loading: boolean;
}

const useContacts = (): UseContactsResponse => {
  const [contacts, setContacts] = useState<ContactInterface[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3080/contacts");
        console.log({ response });
        setContacts(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  return { contacts, error, loading };
};

export default useContacts;
