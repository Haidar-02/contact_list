import Contact from "./Contact";
import "./Styles/ContactList.css";
import { useNavigate } from "react-router-dom";

const ContactList = ({ contacts, fetchContacts }) => {
  const navigate = useNavigate();
  return (
    <div className="list-container">
      <div className="list-header">
        <h1>Contact List</h1>
        <button className="btn add-btn" onClick={() => navigate("/add")}>
          Add New Contact
        </button>
      </div>

      <div className="list-items">
        {contacts.map((contact) => (
          <Contact
            fetchContacts={fetchContacts}
            key={contact.id}
            contact={contact}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
