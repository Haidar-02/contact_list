import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ContactList from "./components/ContactList";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ContactList />
      {/* Add other components/content here */}
    </div>
  );
}

export default App;
