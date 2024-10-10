"use client";
import { Icon } from "leaflet";
import marker from "../../assets/marker.png";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Map = () => {
  const [isClient, setIsClient] = useState(false);
  const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    {
      ssr: false,
    }
  );
  const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    {
      ssr: false,
    }
  );
  const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    {
      ssr: false,
    }
  );
  const Popup = dynamic(
    () => import("react-leaflet").then((mod) => mod.Popup),
    {
      ssr: false,
    }
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const customIcon = new Icon({
    iconUrl: marker.src,
    iconSize: [32, 32],
  });
  return (
    <div className="h-screen w-full">
      <MapContainer
        style={{ height: "450px", width: "100%" }}
        center={[7.032494617551201, 125.51095535258905]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[7.032494617551201, 125.51095535258905]}
          icon={customIcon}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;