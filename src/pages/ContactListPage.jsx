import React, { useEffect, useState } from "react";
import ContactList from "../components/ContactList";
import axios from "axios";

function ContactListPage() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  return (
    <div>
      <ContactList fetchContacts={fetchContacts} contacts={contacts} />
    </div>
  );
}

export default ContactListPage;
