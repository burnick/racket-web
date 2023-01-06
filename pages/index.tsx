import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import MainPage from 'components/MainPage';
import { JobProps, ManilaLatLong } from 'types';
import { JobService } from 'hooks/useJobService';
import InputSlider from 'components/InputSlider';
import dynamic from 'next/dynamic';
import isEqual from 'lodash/isEqual';

const OpenMaps = dynamic(() => import('components/OpenMaps'), {
  ssr: false,
});
interface AppProps {
  userRadius?: number;
  userLat?: number;
  userLng?: number;
  address?: string;
}

const App = ({
  userRadius = 100000,
  userLat = ManilaLatLong.lat,
  userLng = ManilaLatLong.lng,
  address = ManilaLatLong.address,
}: AppProps) => {
  const refSliderElem = useRef<HTMLInputElement | null>(null);
  const { GetAllJobs } = JobService();
  const [radius, setRadius] = useState<number>(userRadius);
  const [page /*, setPage*/] = useState(0);
  const [location, setLocation] = useState({
    lat: userLat,
    lng: userLng,
    address,
  });

  const { data: jobListing, isError } = GetAllJobs({
    page,
    total: 50,
    lng: userLat,
    lat: userLng,
    radius,
  });

  useEffect(() => {
    const node = refSliderElem.current;

    if (node) {
      node.addEventListener('touchend', () => {
        if (!isEqual(node.value, radius)) {
          console.log('radius changed via mobile', node.value);
          setRadius(node.value as unknown as number);
        }
      });

      node.addEventListener('mouseout', () => {
        if (!isEqual(node.value, radius)) {
          setRadius(node.value as unknown as number);
          console.log('radius changed via desktop', node.value, radius);
        }
      });
    }

    return () => {
      refSliderElem.current = null;
      node?.removeEventListener('touchend', () => {
        console.log('remove touchend listener');
      });
      node?.removeEventListener('mouseout', () => {
        console.log('remove mouseout listener');
      });
    };
  }, [radius]);

  return (
    <MainPage>
      <MapContainer>
        <OpenMaps
          radius={radius}
          marker={{
            ...location,
          }}
          multipleMarkers={jobListing?.data?.map((job: JobProps) => job)}
          setMarkers={setLocation}
        />
      </MapContainer>
      <InputSlider value={radius} inputRef={refSliderElem} disabled={isError} />
    </MainPage>
  );
};

const MapContainer = styled.div`
  display: flex;
  position: relative;
  height: 30vh;
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
`;
export default App;
