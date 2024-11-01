import { useEffect, useState } from 'react';

const useWebSocket = (setLocationData) => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {
      console.log("Connected to WebSocket");
    };

    socket.onmessage = (event) => {
      const locationData = JSON.parse(event.data);
      setLocationData(prev => ({
        ...prev,
        [locationData.id]: { latitude: locationData.latitude, longitude: locationData.longitude }
      }));
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => socket.close();
  }, [setLocationData]);
};

export default useWebSocket;
