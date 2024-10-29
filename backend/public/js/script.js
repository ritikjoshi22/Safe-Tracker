let map;
let userMarker;
const entityMarkers = {}; // Store markers for each entity by ID

// Function to calculate distance between two points (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Function to find and display the nearest entity
function findNearestEntity() {
    if (!userMarker) {
        console.log("User location not set.");
        return;
    }

    let nearestEntity = null;
    let minDistance = Infinity;

    const userLatLng = userMarker.getLatLng();

    Object.entries(entityMarkers).forEach(([id, marker]) => {
        const entityLatLng = marker.getLatLng();
        const distance = calculateDistance(
            userLatLng.lat,
            userLatLng.lng,
            entityLatLng.lat,
            entityLatLng.lng
        );

        if (distance < minDistance) {
            minDistance = distance;
            nearestEntity = id;
        }
    });

    if (nearestEntity) {
        console.log("Nearest entity ID:", nearestEntity);
    } else {
        console.log("No entities found.");
    }
}

// Event listener for the "Scan" button
document.getElementById("scanButton").addEventListener("click", findNearestEntity);

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