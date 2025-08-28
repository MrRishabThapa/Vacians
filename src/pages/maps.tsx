// src/pages/maps.tsx
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { LatLngTuple } from "leaflet";
import { mapLocations, opportunitiesData } from "../data/mockData";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocateButton({
  setUserLocation,
  setShowCampaigns,
}: {
  setUserLocation: (pos: LatLngTuple) => void;
  setShowCampaigns: (show: boolean) => void;
}) {
  const map = useMap();
  const [scanning, setScanning] = useState(false);

  const handleClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported in your browser.");
      return;
    }

    setScanning(true);

    setTimeout(() => {
      navigator.geolocation.getCurrentPosition((pos) => {
        const userPos: LatLngTuple = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        map.flyTo(userPos, 14);
        setUserLocation(userPos);
        setShowCampaigns(true);
        setScanning(false);
      });
    }, 1800);
  };

  return (
    <button
      onClick={handleClick}
      className={`absolute top-4 right-4 z-[1000] px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition ${
        scanning
          ? "bg-green-500 animate-pulse text-white"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
    >
      {scanning ? "Scanning..." : "Find Nearby Campaigns"}
    </button>
  );
}

export default function MapsPage() {
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);
  const [showCampaigns, setShowCampaigns] = useState(false);

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-6xl mx-auto rounded-2xl shadow-lg overflow-hidden border-4 border-green-500 mb-6 relative">
        <MapContainer
          center={[27.7172, 85.324]}
          zoom={10}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {userLocation && (
            <Marker position={userLocation}>
              <Popup>You are here 📍</Popup>
            </Marker>
          )}

          {showCampaigns &&
            mapLocations.map((loc) => (
              <Marker key={loc.id} position={loc.coordinates as LatLngTuple}>
                <Popup>
                  <strong>{loc.name}</strong>
                  <br />
                  Urgency:{" "}
                  <span
                    className={`font-bold ${
                      loc.urgency === "high"
                        ? "text-red-600"
                        : loc.urgency === "medium"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {loc.urgency}
                  </span>
                </Popup>
              </Marker>
            ))}

          <LocateButton
            setUserLocation={setUserLocation}
            setShowCampaigns={setShowCampaigns}
          />
        </MapContainer>
      </div>

      {/* Campaigns Text / Placeholder */}
      <div className="text-center mb-6">
        {!showCampaigns ? (
          <h2 className="text-gray-400 font-extrabold text-4xl sm:text-5xl">
            No Campaigns Detected
          </h2>
        ) : (
          <h2 className="text-green-900 font-extrabold text-4xl sm:text-5xl">
            Campaigns Detected
          </h2>
        )}
      </div>

      {/* Nearby Campaign Cards */}
      {showCampaigns && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {opportunitiesData.map((camp) => (
            <div
              key={camp.id}
              className="bg-white rounded-2xl shadow-md p-6 border border-green-200 hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold text-green-700 mb-2">
                {camp.title}
              </h3>
              <p className="text-sm text-gray-700 mb-2">{camp.description}</p>
              <p className="text-xs text-gray-500 mb-2">
                📍 {camp.location} | {camp.date} | {camp.duration}
              </p>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                  camp.urgency === "high"
                    ? "bg-red-100 text-red-700"
                    : camp.urgency === "medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {camp.urgency.toUpperCase()} URGENCY
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
