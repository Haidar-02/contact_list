import React, { useEffect, useState } from "react";
import axios from "axios";
import Contact from "./Contact";
import "./Styles/ContactList.css";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/contacts")
      .then((response) => setContacts(response.data))
      .catch((error) => console.error("Error fetching contacts:", error));
  }, []);

  return (
    <div className="list-container">
      <div className="list-header">
        <h1>Contact List</h1>
        <button className="btn add-btn">Add New Contact</button>
      </div>

      <div className="list-items">
        {contacts.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
