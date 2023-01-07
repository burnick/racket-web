import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import { store } from 'store';
import MainPage from 'components/MainPage';
import { JobProps, ManilaLatLong } from 'types';
import { JobService } from 'hooks/useJobService';
import { CoordinateService } from 'hooks/useCoordinateService';
import InputSlider from 'components/InputSlider';
import dynamic from 'next/dynamic';
import isEqual from 'lodash/isEqual';
import JobList from 'components/JobList';

const OpenMaps = dynamic(() => import('components/OpenMaps'), {
  ssr: false,
});
interface AppProps {
  userRadius?: number;
  userLat?: number;
  userLng?: number;
  address?: string;
}

const App = () => {
  const state = store.getState();
  const refSliderElem = useRef<HTMLInputElement | null>(null);
  const { GetAllJobs } = JobService();
  const { UpsertCoordinates, GetCoordinates } = CoordinateService();
  const [radius, setRadius] = useState<number>(100000);
  const [page, setPage] = useState(0);
  const { data: coordinatesData, isLoading } = GetCoordinates(state.user.uid);

  const [location, setLocation] = useState({
    lat: !isLoading ? coordinatesData.lat : ManilaLatLong.lat,
    lng: !isLoading ? coordinatesData.lng : ManilaLatLong.lng,
    address: !isLoading ? coordinatesData.address : ManilaLatLong.address,
  });

  const { data: jobListing } = GetAllJobs({
    page,
    total: 50,
    lat: !isLoading ? coordinatesData.lat : ManilaLatLong.lat,
    lng: !isLoading ? coordinatesData.lng : ManilaLatLong.lng,
    radius,
  });

  const { mutate, isError } = UpsertCoordinates();

  useEffect(() => {
    if (radius && location && state?.user?.uid) {
      mutate({
        uid: state?.user?.uid,
        ...location,
        radius,
      });
    }
  }, [radius, location, mutate]);

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
      {isLoading ? (
        <Spin />
      ) : (
        <Container>
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
          <InputSlider
            value={radius}
            inputRef={refSliderElem}
            disabled={isError}
          />
          <JobList
            jobListing={jobListing?.data}
            page={page}
            setPage={setPage}
          />
        </Container>
      )}
    </MainPage>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const MapContainer = styled.div`
  display: flex;
  position: relative;
  height: 30vh;
  width: 100%;
  margin-bottom: 20px;
  overflow: hidden;
`;
export default App;
