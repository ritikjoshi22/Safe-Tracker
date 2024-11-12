import { Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useWebSocket from "../hooks/wsHooks"; // Import the custom WebSocket hook
import { Store } from "../Store";
import ambulance from "../assets/ambulance.png"
import police from "../assets/police.png"
import fireBrigade from "../assets/fire_brigade.png"

const HomePageEmp = () => {
  const {
    state: { empInfo }
  } = useContext(Store);
  console.log("service type:",empInfo.serviceType)

  let iconUrl = null;
  let iconRetinaUrl = null;
  
  // Determine the appropriate icon based on empInfo.serviceType
  if (empInfo.serviceType === "ambulance") {
    iconUrl = ambulance;
    iconRetinaUrl = ambulance;
  } else if (empInfo.serviceType === "police") {
    iconUrl = police;
    iconRetinaUrl = police;
  } else if (empInfo.serviceType === "fire_brigade") {
    iconUrl = fireBrigade;
    iconRetinaUrl = fireBrigade;
  }
  
  // Create the custom icon
  const customIcon = new L.Icon({
    iconUrl: iconUrl, // Assign the determined icon
    iconRetinaUrl: iconRetinaUrl, // Assign the determined icon for retina display
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41], // Customize size as per your icon
    iconAnchor: [12, 41], // Anchor icon to point
    popupAnchor: [1, -34], // Offset popup position
    shadowSize: [41, 41],
  });


  const [locations, setLocations] = useState({});
  const [userLocation, setUserLocation] = useState(null);

  // Use the custom WebSocket hook
  useWebSocket(setLocations);

  useEffect(() => {
    // Prompt user for location and set up initial map view
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          // Send user location to backend
          const socket = new WebSocket("ws://localhost:3000");
          socket.onopen = () => {
            socket.send(JSON.stringify({
              id: "user", // Assign an ID if needed
              latitude,
              longitude,
              type: "user" // Set the entity type as "user"
            }));
          };
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
  }, []);

  return (<>
    <Helmet>
          <title>Beyond Infinity</title>
        </Helmet>
    <Row>
      {userLocation && (
        <MapContainer center={[userLocation.latitude, userLocation.longitude]} zoom={13} style={{ height: "500px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="Safe Track"
          />
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
