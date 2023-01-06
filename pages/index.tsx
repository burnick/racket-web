import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import MainPage from 'components/MainPage';
import { JobProps, ManilaLatLong } from 'types';
import { JobService } from 'hooks/useJobService';
import dynamic from 'next/dynamic';

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
  const { GetAllJobs } = JobService();
  const [radius, setRadius] = useState<number>(userRadius);
  const [page, setPage] = useState(0);
  const [location, setLocation] = useState({
    lat: userLat,
    lng: userLng,
    address,
  });

  const { data: jobListing, isLoading } = GetAllJobs({
    page,
    total: 50,
    lng: userLat,
    lat: userLng,
    radius,
  });

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
