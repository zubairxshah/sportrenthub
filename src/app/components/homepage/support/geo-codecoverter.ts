export const reverseGeocode = async (lat: number, lng: number) => {
    // Implement geocoding using your preferred service
    // (Google Maps Geocoding API, Mapbox, etc.)
    try {
      // Call geocoding API
      // Set location state with returned city name
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  // Update following code in SearchBox Once Google Maps API is integrated
//   const handleLocationDetect = async () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const { latitude, longitude } = position.coords;
//         const location = await reverseGeocode(latitude, longitude);
//         setLocation(location);
//       });
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   };
  