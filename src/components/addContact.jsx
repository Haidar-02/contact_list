import React, { useState } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "./Styles/AddContact.css";
import { useNavigate } from "react-router-dom";

const markerIcon = new L.Icon({
  iconUrl: require("./Styles/marker.png"),
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});

const AddContact = ({ fetchContacts }) => {
  const navigate = useNavigate();
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    latitude: 33.8938,
    longitude: 35.5018,
  });

  const handleInputChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setNewContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  const handleAddContact = async () => {
    if (newContact.name && newContact.phone) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/store",
          newContact
        );
        if (response.status === 200) {
          setNewContact({ name: "", phone: "", latitude: "", longitude: "" });
          navigate(`/`);
        }
      } catch (error) {
        console.error("Error adding new contact:", error);
      }
    }
  };

  function MapInput() {
    useMapEvents({
      click: (event) => {
        const { lat, lng } = event.latlng;
        setNewContact((prevContact) => ({
          ...prevContact,
          latitude: lat,
          longitude: lng,
        }));
      },
    });
    return null;
  }

  return (
    <div className="container">
      <div className="form">
        <label htmlFor="name">~ Contact Name</label>
        <input
          type="text"
          name="name"
          value={newContact.name}
          autoComplete="off"
          placeholder="Name"
          onChange={handleInputChange}
        />
        <label htmlFor="phone">~ Contact Phone</label>
        <input
          type="tel"
          name="phone"
          value={newContact.phone}
          placeholder="Phone"
          autoComplete="off"
          onChange={handleInputChange}
        />

        <label htmlFor="location">~ Contact Location</label>
        <MapContainer
          center={[newContact.latitude, newContact.longitude]}
          zoom={12}
          style={{ height: "200px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapInput />
          {newContact.latitude && newContact.longitude && (
            <Marker
              position={[newContact.latitude, newContact.longitude]}
              icon={markerIcon}
            >
              <Popup>
                <strong>Latitude: </strong>
                {newContact.latitude}
                <br />
                <strong>Longitude: </strong>
                {newContact.longitude}
              </Popup>
            </Marker>
          )}
        </MapContainer>

        <button className="btn" onClick={handleAddContact}>
          Add Contact
        </button>
      </div>
    </div>
  );
};

export default AddContact;
