import { useEffect, useState } from 'react';

const useSocket = (setLocationData, empInfo) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    setSocket(ws);

    ws.onopen = () => {
      console.log("Connected to WebSocket");

      // Send employee info after the connection is established
      if (empInfo) {
        ws.send(JSON.stringify({ type: "employee-connected", empInfo }));
      }
    };

    ws.onmessage = (event) => {
      const locationData = JSON.parse(event.data);
      setLocationData((prev) => ({
        ...prev,
        [locationData.id]: { latitude: locationData.latitude, longitude: locationData.longitude, type: locationData.type },
      }));
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => ws.close();
  }, [setLocationData, empInfo]);

  return socket;
};

export default useSocket;
