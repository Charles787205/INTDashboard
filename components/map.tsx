"use client";
import { Icon, LatLng, LatLngExpression } from "leaflet";
import { NoSSR } from "@/components";

import dynamic from "next/dynamic";
import { AreaType } from "@/types";

const Map = ({
  areas,
  zoom,
  center,
}: {
  areas: AreaType[];
  zoom?: number;
  center?: LatLngExpression;
}) => {
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
  const Polygon = dynamic(
    () => import("react-leaflet").then((mod) => mod.Polygon),
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
  const Tooltip = dynamic(
    () => import("react-leaflet").then((mod) => mod.Tooltip),
    {
      ssr: false,
    }
  );

  const areaPolygons: {
    name: string;
    coordinates: LatLngExpression[];
    successRate?: number;
  }[] = [];
  const colors = ["purple", "blue", "black", "red", "green", "orange"];
  areas.map((area) => {
    if (area.coordinates) {
      const polygon: LatLngExpression[] = []; // Temporary array for each area’s polygon coordinates

      for (let i = 0; i < area.coordinates.length; i++) {
        polygon.push([
          area.coordinates[i].latitude,
          area.coordinates[i].longitude,
        ]);
      }

      areaPolygons.push({
        name: area.name,
        coordinates: polygon,
        successRate: area.parcel_count
          ? Math.round(
              (area.parcel_count.success / area.parcel_count.total) * 100
            ) / 100
          : undefined,
      });
    }
  });

  return (
    <div className="h-full rounded-lg overflow-hidden shadow-lg">
      <NoSSR>
        {typeof window !== "undefined" && (
          <MapContainer
            style={{ height: "100%", width: "100%" }}
            center={center || [7.032494617551201, 125.51095535258905]}
            zoom={zoom || 13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {areaPolygons.map((area, index) => (
              <Polygon
                key={index}
                positions={area.coordinates}
                pathOptions={{
                  color: colors[index % colors.length],
                  fillColor: colors[index % colors.length], // Fill color
                }}
              >
                <Tooltip direction="bottom" offset={[0, 20]} opacity={1} sticky>
                  <div className="flex-col">
                    {area.name}
                    {area.successRate ? (
                      <p>Success Rate: {`${area.successRate}`}%</p>
                    ) : (
                      ""
                    )}
                  </div>
                </Tooltip>
              </Polygon>
            ))}
          </MapContainer>
        )}
      </NoSSR>
    </div>
  );
};

export default Map;
