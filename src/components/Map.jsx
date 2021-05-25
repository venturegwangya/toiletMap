/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const seoul = [37.40095, 126.733522];

function Map() {
  return (
    <MapContainer
      css={css`
        width: 100%;
        height: 100vh;
      `}
      center={seoul}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={seoul}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
