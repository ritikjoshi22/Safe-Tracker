let map; // Declare map in the outer scope

// Check if geolocation is available in the browser
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      // Initialize the map with the user's location
      map = L.map("map").setView([latitude, longitude], 16);

      // Add a tile layer to the map (OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Safe Track",
      }).addTo(map);
      googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
});

      googleStreets.addTo(map);
       // Function to find nearby hospitals
       findNearbyHospitals(latitude, longitude, 5000); // 500 meters radius
      // Add a marker for the user's current location
      L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup("You are here!")
        .openPopup();

    },
    (error) => {
      console.error(error);
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

// Function to fetch nearby hospitals using Overpass API
function findNearbyHospitals(lat, lng, radius) {
  const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:${radius},${lat},${lng})[amenity=hospital];out;`;

  fetch(overpassUrl)
    .then((response) => response.json())
    .then((data) => {
      data.elements.forEach((element) => {
        const hospitalName = element.tags.name || "Unnamed Hospital";
        console.log("Nearby Hospital:", hospitalName);

      });
    })
    .catch((error) => console.error("Error fetching hospital data:", error));
}
