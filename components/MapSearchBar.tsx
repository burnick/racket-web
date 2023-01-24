import React, { useEffect } from 'react';
import { SetMarkerProps } from 'types';
import { useMap } from 'react-leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import { LatLng } from 'leaflet';
import { Geocoder, geocoders } from 'leaflet-control-geocoder';

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

const geocoder = new geocoders.Nominatim({
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
    new Geocoder({
      query: '',
      placeholder: 'Search your address',
      defaultMarkGeocode: false,
      geocoder,
    })
      .on(
        'markgeocode',
        (evt: {
          geocode: {
            center: LatLng;
            name:
              | string
              | ((prevState: string) => string)
              | HTMLElement
              | ((layer: L.Layer) => L.Content)
              | L.Popup;
          };
        }) => {
          const latlng = evt.geocode.center;
          const address = evt.geocode.name.toString();
          if (setMarkers) {
            setMarkers({ ...latlng, address: address });
          }
        }
      )
      .addTo(map);
  }, [map, setMarkers]);

  return null;
};

export default React.memo(MapSearchBar);
