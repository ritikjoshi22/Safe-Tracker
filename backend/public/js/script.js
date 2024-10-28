// public/js/script.js
let map;
let userMarker;
const entityMarkers = {}; // Store markers for each entity by ID

// Check if geolocation is available in the browser
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      // Initialize the map
      map = L.map("map").setView([latitude, longitude], 16);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Safe Track",
      }).addTo(map);

      // User marker
      userMarker = L.marker([latitude, longitude], {
        icon: createCustomIcon("user"),
      })
        .addTo(map)
        .bindPopup("You are here")
        .openPopup();

      // Connect to WebSocket
      const socket = new WebSocket("ws://localhost:3000");

      // Receive live location updates from WebSocket
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // Check if the received location data corresponds to an entity type (police, ambulance, etc.)
        const iconType = data.type; // e.g., "police" or "ambulance"
        const id = data.id;
        // Create or update the marker for this entity on the map
        if (entityMarkers[id]) {
          entityMarkers[id].setLatLng([data.latitude, data.longitude]);
        } else {
          const newEntityMarker = L.marker([data.latitude, data.longitude], {
            icon: createCustomIcon(iconType),
          })
            .addTo(map)
            .bindPopup(`${iconType.charAt(0).toUpperCase() + iconType.slice(1)} - ID: ${data.id}`);
          entityMarkers[id] = newEntityMarker;
        }
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

// Function to update or create entity markers on the map
function updateEntityMarker(data) {
  const { id, latitude, longitude, serviceType } = data;

  // If the entity already has a marker, just update its position
  if (entityMarkers[id]) {
    entityMarkers[id].setLatLng([latitude, longitude]);
  } else {
    // Create a new marker if it doesn't exist
    const iconType = serviceType; // e.g., "ambulance", "police", etc.
    const marker = L.marker([latitude, longitude], {
      icon: createCustomIcon(iconType),
    })
      .addTo(map)
      .bindPopup(`${serviceType} - Live location`);

    entityMarkers[id] = marker; // Store marker by entity ID
  }
}

// Function to create custom icons based on service type
function createCustomIcon(type) {
  const iconUrl =
    {
      user: "/images/pin-map.png",
      ambulance: "/images/ambulance.png",
      police: "/images/police.png",
      fire_brigade: "/images/fire-brigade.png",
    }[type]

  return L.icon({
    iconUrl: iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}