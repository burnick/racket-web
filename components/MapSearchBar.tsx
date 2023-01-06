import React, { useEffect } from 'react';
import { SetMarkerProps } from 'types';
import { useMap } from 'react-leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import L from 'leaflet';

interface MapSearchBarProps extends SetMarkerProps {
  radius: number;
}
// const icon = L.icon({
//   iconSize: [25, 41],
//   iconAnchor: [10, 41],
//   popupAnchor: [2, -40],
//   iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
// });

const Control = L.Control as any;
const geocoder = Control.Geocoder.nominatim({
  geocodingQueryParams: {
    limit: 3,
    addressdetails: 1,
    namedetails: 1,
    countrycodes: 'ph',
  },
});

const MapSearchBar = ({ setMarkers }: MapSearchBarProps) => {
  const map = useMap();

  useEffect(() => {
    Control.geocoder({
      query: '',
      placeholder: 'Search your address',
      defaultMarkGeocode: false,
      geocoder,
    })
      .on(
        'markgeocode',
        (e: {
          geocode: {
            center: any;
            name:
              | string
              | ((prevState: string) => string)
              | HTMLElement
              | ((layer: L.Layer) => L.Content)
              | L.Popup;
          };
        }) => {
          let latlng = e.geocode.center;
          let address = e.geocode.name.toString();
          if (setMarkers) setMarkers({ ...latlng, address: address });
        }
      )
      .addTo(map);
  }, [map, setMarkers]);

  return null;
};

export default React.memo(MapSearchBar);
