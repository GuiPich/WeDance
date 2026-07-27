import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export function WebMapScreen() {
  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={6}
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={[48.8566, 2.3522]}>
        <Popup>Soirée Salsa</Popup>
      </Marker>
    </MapContainer>
  );
}
