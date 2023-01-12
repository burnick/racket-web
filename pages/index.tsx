import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { store } from 'store';
import MainPage from 'components/MainPage';
import { JobProps, ManilaLatLong } from 'types';
import { JobService } from 'hooks/useJobService';
import { CoordinateService } from 'hooks/useCoordinateService';
import InputSlider from 'components/InputSlider';
import dynamic from 'next/dynamic';
import isEqual from 'lodash/isEqual';
import JobList from 'components/JobList';
import Loading from 'components/Loading';

const OpenMaps = dynamic(() => import('components/OpenMaps'), {
  ssr: false,
});

interface AppProps {
  userUid: string;
  userRadius: number;
  userLat?: number;
  userLng?: number;
  address?: string;
}

const LocationComponent = ({
  userUid,
  userLat = ManilaLatLong.lat,
  userLng = ManilaLatLong.lng,
  address = ManilaLatLong.address,
  userRadius,
}: AppProps) => {
  const refSliderElem = useRef<HTMLInputElement | null>(null);
  const node = refSliderElem.current;
  const [page, setPage] = useState(0);
  const { UpsertCoordinates } = CoordinateService();
  const { GetAllJobs } = JobService();
  const { mutate, isError, isLoading } = UpsertCoordinates();
  const [location, setLocation] = useState({
    lat: userLat,
    lng: userLng,
    address,
  });

  const [radius, setRadius] = useState<number>(userRadius);

  const { data: jobListing } = GetAllJobs({
    page,
    total: 50,
    lat: userLat,
    lng: userLng,
    radius,
  });

  useEffect(() => {
    if (radius && location?.lng && userUid) {
      console.log('updating location', location, radius);
      mutate({
        uid: userUid,
        ...location,
        radius,
      });
    }
  }, [radius, location, mutate, userUid]);

  useEffect(() => {
    if (node) {
      node.addEventListener('touchend', () => {
        if (!isEqual(node.value, radius)) {
          //console.log('radius changed via mobile', node.value);
          setRadius(node.value as unknown as number);
        }
      });

      node.addEventListener('mouseout', () => {
        if (!isEqual(node.value, radius)) {
          setRadius(node.value as unknown as number);
          //console.log('radius changed via desktop', node.value, radius);
        }
      });
    }

    return () => {
      // refSliderElem.current = null;
      node?.removeEventListener('touchend', () => {
        console.log('remove touchend listener');
      });
      node?.removeEventListener('mouseout', () => {
        console.log('remove mouseout listener');
      });
    };
  }, [radius, node]);

  return (
    <>
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
      {!isLoading && jobListing?.data ? (
        <JobList jobListing={jobListing?.data} page={page} setPage={setPage} />
      ) : (
        <Loading />
      )}
    </>
  );
};

const App = () => {
  const state = store.getState();

  const { GetCoordinates } = CoordinateService();

  const { data: coordinatesData, isLoading } = GetCoordinates(state.user?.uid);

  return (
    <MainPage>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <LocationComponent
            userUid={state.user?.uid}
            userLng={coordinatesData?.lng}
            userRadius={coordinatesData?.radius}
            userLat={coordinatesData?.lat}
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
