"use client"; // this is a client component
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import ScalableMarker from "./ScalingSvg";
const Map = ({ locations, handleMarkerClick }) => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: locations[0].Lat,
    lng: locations[0].Long,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAX5T9cJhtCviNoUTi4z9d9coNAMlqwOrc">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        {locations.map((location) => (
          <ScalableMarker
            key={location.Lat * location.Long}
            position={{ lat: location.Lat, lng: location.Long }}
            fill={`rgba(255,0,0,${location["Risk Rating"]})`}
            tooltipText={`
                ${location["Asset Name"]}
                ${location["Business Category"]}
            `}
            handleClick={() => {
              handleMarkerClick(location);
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

// export default Map;
