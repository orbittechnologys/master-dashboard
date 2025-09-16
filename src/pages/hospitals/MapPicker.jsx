import React, { useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "../../constants";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "300px",
};
const defaultCenter = { lat: 15.3647, lng: 75.124 };

const GoogleMapPicker = ({ onLocationSelect }) => {
  const [marker, setMarker] = useState(defaultCenter);
  const [searchText, setSearchText] = useState("");
  const autocompleteRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading...</div>;

  // When user selects from autocomplete
  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const addr = place.formatted_address || place.name;

        setMarker({ lat, lng });
        setSearchText(addr);
        onLocationSelect({ latitude: lat, longitude: lng, address: addr });
      }
    }
  };

  // Reverse geocode lat/lng → address
  const getAddressFromLatLng = async (lat, lng) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAP_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results?.[0]?.formatted_address || "";
  };

  return (
    <div className="mt-2">
      <Autocomplete
        onLoad={(ref) => (autocompleteRef.current = ref)}
        onPlaceChanged={onPlaceChanged}
      >
        <input
          type="text"
          placeholder="Search location"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full p-2 rounded border border-gray-300"
        />
      </Autocomplete>

      <div className="mt-2 h-64 rounded-md overflow-hidden border border-gray-300">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={marker || defaultCenter}
          onClick={async (e) => {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setMarker({ lat, lng });

            const addr = await getAddressFromLatLng(lat, lng);
            setSearchText(addr);

            onLocationSelect({ latitude: lat, longitude: lng, address: addr });
          }}
        >
          {marker && <Marker position={marker} />}
        </GoogleMap>
      </div>
    </div>
  );
};

export default GoogleMapPicker;
