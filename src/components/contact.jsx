import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "./Styles/Contact.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
const markerIcon = new L.Icon({
  iconUrl: require("./Styles/marker.png"),
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});
const Contact = ({ contact }) => {
  const deleteContact = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/delete/${contact.id}`
      );
      console.log(response.data);
      await fetchContacts();
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  return (
    <div className="contact-container">
      <h3>{contact.name}</h3>
      <p>
        <strong>Phone:</strong> {contact.phone}
      </p>
      <div className="map-container">
        <MapContainer
          center={[contact.latitude, contact.longitude]}
          zoom={12}
          scrollWheelZoom={false}
          style={{ height: "150px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={[contact.latitude, contact.longitude]}
            icon={markerIcon}
          />
        </MapContainer>
      </div>
      <div className="btn-container">
        <button className="edit-btn"> Edit </button>{" "}
        <button className="dlt-btn" onClick={deleteContact}>
          Delete{""}
        </button>
      </div>
    </div>
  );
};

export default Contact;
