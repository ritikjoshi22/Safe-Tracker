import { Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Store } from "../Store";
import ambulance from "../assets/ambulance.png";
import police from "../assets/police.png";
import fireBrigade from "../assets/fire_brigade.png";
import useSocket from "../hooks/wsHooks";

const HomePageEmp = () => {
  const {
    state: { empInfo },
  } = useContext(Store);

  const [locations, setLocations] = useState({});
  const [userLocation, setUserLocation] = useState(null);

  // Determine the icon based on empInfo.serviceType
  let iconUrl = null;
  let iconRetinaUrl = null;
  if (empInfo?.serviceType === "ambulance") {
    iconUrl = ambulance;
    iconRetinaUrl = ambulance;
  } else if (empInfo?.serviceType === "police") {
    iconUrl = police;
    iconRetinaUrl = police;
  } else if (empInfo?.serviceType === "fire_brigade") {
    iconUrl = fireBrigade;
    iconRetinaUrl = fireBrigade;
  }

  // Custom icon for Leaflet
  const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Use the custom hook for WebSocket
  const socket = useSocket(setLocations, empInfo);

  useEffect(() => {
    // Get user's current location and send to the server
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          // Emit the location to the server
          if (socket) {
            socket.send(
              JSON.stringify({
                type: "send-location",
                id: empInfo.id, // Assuming empInfo contains a unique employee ID
                latitude,
                longitude,
                serviceType: empInfo.serviceType,
              })
            );
          }
        },
        (error) => {
          console.error("Error retrieving geolocation:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [socket, empInfo]);

  return (
    <>
      <Helmet>
        <title>Beyond Infinity</title>
      </Helmet>
      <Row>
        {userLocation && (
          <MapContainer center={[userLocation.latitude, userLocation.longitude]} zoom={13} style={{ height: "500px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="Safe Track" />
            <Marker position={[userLocation.latitude, userLocation.longitude]} icon={customIcon}>
              <Popup>You are here</Popup>
            </Marker>
            {Object.values(locations).map((location) => (
              <Marker key={location.id} position={[location.latitude, location.longitude]} icon={customIcon}>
                <Popup>{location.type}</Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </Row>
    </>
  );
};

export default HomePageEmp;
