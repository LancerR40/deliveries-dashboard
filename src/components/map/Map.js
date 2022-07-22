import { useState, useCallback, memo } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import useScreen from "../../hooks/useScreen";

const center = { lat: 6.42375, lng: -66.58973 };
const zoom = 6;
const config = { id: "google-map-script", googleMapsApiKey: "AIzaSyBEyUZbF5f1WdKcjtc7u7_B9dGyOSu-4o4" };

const Map = ({ style, onClick, children }) => {
  const { screenWidth } = useScreen();
  
  const height = style?.height ? style.height : screenWidth < 1024 ? 400 : 600
  const containerStyle = { height, borderRadius: "0.25rem" };

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
      onClick={onClick}
    >
      {children}
    </GoogleMap>
  );
};

export default memo(Map);
