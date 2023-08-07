import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";

const markerIcon = new L.Icon({
  iconUrl: require("./Styles/marker.png"),
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});

const EditContact = ({ fetchContacts }) => {
  const [contact, setContact] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchContact = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/contact/${id}`
      );
      setContact(data);
    };
    fetchContact();
  }, []);

  const handleInputChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  const handleEditContact = async () => {
    if (contact.name && contact.phone) {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/update/${contact.id}`,
          contact
        );
        if (response.status === 200) {
          setContact({
            name: "",
            phone: "",
            latitude: "",
            longitude: "",
          });
          await fetchContacts();
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
        setContact((prevContact) => ({
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
          value={contact.name}
          autoComplete="off"
          placeholder="Name"
          onChange={handleInputChange}
        />
        <label htmlFor="phone">~ Contact Phone</label>
        <input
          type="tel"
          name="phone"
          value={contact.phone}
          placeholder="Phone"
          autoComplete="off"
          onChange={handleInputChange}
        />

        <label htmlFor="location">~ Contact Location</label>
        <MapContainer
          center={[contact.latitude, contact.longitude]}
          zoom={12}
          style={{ height: "200px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapInput />
          {contact.latitude && contact.longitude && (
            <Marker
              position={[contact.latitude, contact.longitude]}
              icon={markerIcon}
            >
              <Popup>
                {contact.latitude}
                <br />
                {contact.longitude}
              </Popup>
            </Marker>
          )}
        </MapContainer>

        <button className="btn" onClick={handleEditContact}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditContact;
