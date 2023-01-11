import React, { useEffect } from 'react';
import styled from 'styled-components';
// import Briefcase from 'assets/images/briefcase.svg';

import {
  MapContainer,
  TileLayer,
  // LayerGroup,
  Popup,
  Marker,
  // useMapEvents,
  Circle,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

//import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import MapSearchBar from 'components/MapSearchBar';
import { MapComponentProps } from 'types';

const DefaultIcon = L.icon({
  iconUrl: 'leaflet/images/marker-icon.png',
  shadowUrl: 'leaflet/images/marker-shadow.png',
  iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
});

const MapComponent = ({
  radius,
  marker,
  multipleMarkers,
}: MapComponentProps) => {
  // Disable on click
  // const map = useMapEvents({
  //   click: (e) => {
  //     setMarkers && setMarkers([{ ...e.latlng, address: 'Manila' }]);
  //   },
  //   locationfound(e) {
  //     map.flyTo(e.latlng, map.getZoom());
  //   },
  // });

  useEffect(() => {
    (async function init() {
      // delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
        iconUrl: 'leaflet/images/marker-icon.png',
        shadowUrl: 'leaflet/images/marker-shadow.png',
      });

      //L.DomUtil.setOpacity(mymap.zoomControl.getContainer(), 0.5);
    })();
  }, []);

  return (
    <div style={{ height: '30vh' }}>
      {multipleMarkers?.map((marker, index) => (
        <Marker position={marker} icon={DefaultIcon} key={`marker_${index}`}>
          <Popup>
            <span>{marker.address}</span>
          </Popup>
        </Marker>
      ))}
      {marker && (
        <Marker position={marker}>
          <Popup>
            <span>{marker.address}</span>
          </Popup>
        </Marker>
      )}
      <Circle center={[marker.lat, marker.lng]} color="red" radius={radius} />
    </div>
  );
};

const OpenMaps = ({
  radius,
  marker,
  setMarkers,
  multipleMarkers,
}: MapComponentProps) => {
  return (
    <MapContainerStyled
      center={[marker.lat, marker.lng]}
      zoom={8}
      scrollWheelZoom={false}
    >
      <MapSearchBar radius={radius} setMarkers={setMarkers} />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapComponent
        radius={radius}
        marker={marker}
        multipleMarkers={multipleMarkers}
      />
    </MapContainerStyled>
  );
};

const MapContainerStyled = styled(MapContainer)`
  //display: block;
  width: 100%;
  height: 100%;
`;
export default React.memo(OpenMaps);
