import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ContactListPage from "./pages/ContactListPage";
import AddContactPage from "./pages/AddNewContact";
import EditContact from "./pages/EditContact";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<ContactListPage />} />
          <Route path="/add" element={<AddContactPage />} />
          <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
