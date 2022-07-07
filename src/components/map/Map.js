import { useState, useCallback, memo } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import useScreen from "../../hooks/useScreen";

const center = { lat: 6.42375, lng: -66.58973 };
const zoom = 6;
const config = { id: "google-map-script", googleMapsApiKey: "AIzaSyBEyUZbF5f1WdKcjtc7u7_B9dGyOSu-4o4" };

const Map = (props) => {
  const { screenWidth } = useScreen();
  const containerStyle = {
    height: screenWidth < 1024 ? "400px" : "600px",
    borderRadius: "0.25rem",
  };

  const { isLoaded } = useJsApiLoader(config);

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => setMap(map), []);

  const onUnmount = useCallback(() => setMap(null), []);

  if (!isLoaded) {
    return null;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={props.onClick}
    >
      <Marker position={{ lat: 10.66663, lng: -71.61245 }} />

      <Marker position={{ lat: 10.48801, lng: -66.87919 }} />

      <Marker position={{ lat: 8.32111, lng: -71.61245 }} />
    </GoogleMap>
  );
};

export default memo(Map);
