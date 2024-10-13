"use client";
import { Icon, LatLng, LatLngExpression } from "leaflet";
import { NoSSR } from "@/components";

import dynamic from "next/dynamic";

const Map = () => {
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

  const customIcon = new Icon({
    iconUrl: "/marker.png",
    iconSize: [32, 32],
  });

  const bagoAplayaCoords: LatLngExpression[] = [
    [7.04581, 125.52418],
    [7.04811, 125.52871],
    [7.04956, 125.53457],
    [7.05049, 125.53927],
    [7.04917, 125.54466],
    [7.04674, 125.54633],
    [7.04463, 125.54121],
    [7.0431, 125.54193],
    [7.0386, 125.53469],
    [7.03244, 125.53271],
    [7.02929, 125.52602],
    [7.03802, 125.52237],
  ];

  const bagoGalleraCoords: LatLngExpression[] = [
    [7.05081, 125.54124],
    [7.05111, 125.54135],
    [7.05141, 125.54185],
    [7.05802, 125.53526],
    [7.0637, 125.52815],
    [7.06291, 125.50373],
    [7.06206, 125.49974],
    [7.0578, 125.50524],
    [7.05373, 125.50751],
    [7.04544, 125.50073],
    [7.0437, 125.50373],
    [7.04097, 125.50455],
    [7.03825, 125.50653],
    [7.0368, 125.50912],
    [7.03804, 125.51635],
    [7.04794, 125.51474],
    [7.04609, 125.51858],
    [7.04913, 125.52478],
    [7.0494, 125.53428],
  ];
  const dumoyCoords: LatLngExpression[] = [
    [7.03812, 125.4953],
    [7.04078, 125.50064],
    [7.03755, 125.50737],
    [7.03701, 125.51414],
    [7.03921, 125.51727],
    [7.03788, 125.52266],
    [7.03545, 125.52433],
    [7.03335, 125.51922],
    [7.03181, 125.51994],
    [7.02935, 125.5259],
    [7.02114, 125.51889],
    [7.02601, 125.51068],
    [7.02388, 125.50905],
    [7.02533, 125.50591],
    [7.02745, 125.504],
    [7.03326, 125.49797],
  ];
  const daliaoCoords: LatLngExpression[] = [
    [7.01587, 125.50865],
    [7.01814, 125.51019],
    [7.0219, 125.50739],
    [7.02617, 125.50437],
    [7.02644, 125.50535],
    [7.02564, 125.51114],
    [7.02377, 125.5138],
    [7.02534, 125.51448],
    [7.02483, 125.51606],
    [7.02333, 125.51712],
    [7.02198, 125.51621],
    [7.02044, 125.51694],
    [7.01748, 125.51582],
    [7.01461, 125.51641],
    [7.0133, 125.51323],
    [7.01104, 125.51068],
    [7.00997, 125.50939],
    [7.00848, 125.50825],
    [7.00405, 125.5061],
    [7.00732, 125.50119],
    [7.01021, 125.49758],
    [7.01235, 125.50229],
    [7.01609, 125.50391],
  ];

  return (
    <div className="h-full rounded-lg overflow-hidden shadow-lg">
      <NoSSR>
        {typeof window !== "undefined" && (
          <MapContainer
            style={{ height: "100%", width: "100%" }}
            center={[7.032494617551201, 125.51095535258905]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polygon
              pathOptions={{ color: "purple" }}
              positions={bagoAplayaCoords}
            >
              <Tooltip direction="bottom" offset={[0, 20]} opacity={1} sticky>
                Bago Aplaya: 10%
              </Tooltip>
            </Polygon>
            <Polygon
              pathOptions={{ color: "blue" }}
              positions={bagoGalleraCoords}
            >
              <Tooltip direction="bottom" offset={[0, 20]} opacity={1} sticky>
                Bago Gallera: 50%
              </Tooltip>
            </Polygon>
            <Polygon pathOptions={{ color: "red" }} positions={dumoyCoords}>
              <Tooltip direction="bottom" offset={[0, 20]} opacity={1} sticky>
                Dumoy: 50%
              </Tooltip>
            </Polygon>
            <Polygon pathOptions={{ color: "green" }} positions={daliaoCoords}>
              <Tooltip direction="bottom" offset={[0, 20]} opacity={1} sticky>
                Daliao: 50%
              </Tooltip>
            </Polygon>
          </MapContainer>
        )}
      </NoSSR>
    </div>
  );
};

export default Map;
