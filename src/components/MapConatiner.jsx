"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// Fix marker icon issue in Leaflet
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

// Dynamically import MapContainer and other components (Client-side only)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

export default function MapComponent({ lat, lng }) {
  const [customIcon, setCustomIcon] = useState(null);

  useEffect(() => {
    import("leaflet").then((L) => {
      setCustomIcon(
        new L.Icon({
          iconUrl: markerIconPng.src,
          shadowUrl: markerShadowPng.src,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      );
    });
  }, []);

  if (!customIcon) return <p>Loading map...</p>; // Prevent SSR issues

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
