"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue in Leaflet
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIconPng.src,
  shadowUrl: markerShadowPng.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapComponent({ lat, lng }) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      style={{ height: "400px", width: "100%", borderRadius: "10px" }}
      className="shadow-md mt-8"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lng]} icon={customIcon}>
        <Popup>
          Location: {lat}, {lng}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
