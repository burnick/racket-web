import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { store } from 'store';
import { addLocation } from 'store/slice/location';
import { useDispatch } from 'react-redux';
import { JobProps, ManilaLatLong } from 'types';
import { JobService } from 'hooks/useJobService';
import { CoordinateService } from 'hooks/useCoordinateService';
import InputSlider from 'components/InputSlider';
import dynamic from 'next/dynamic';
import isEqual from 'lodash/isEqual';
import JobList from 'components/JobList';
import Loading from 'components/Loading';
// import consoleHelper from 'utils/consoleHelper';

const OpenMaps = dynamic(() => import('components/OpenMaps'), {
  ssr: false,
});

interface AppProps {
  userUid: string;
  userRadius?: number;
  userLat?: number;
  userLng?: number;
  address?: string;
}

const LocationComponent = ({
  userUid,
  userLat = ManilaLatLong.lat,
  userLng = ManilaLatLong.lng,
  address = ManilaLatLong.address,
  userRadius = 10000,
}: AppProps) => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  const { UpsertCoordinates } = CoordinateService();
  const { GetAllJobs } = JobService();
  const { mutate, isError, isLoading } = UpsertCoordinates();

  const [location, setLocation] = useState({
    lat: userLat,
    lng: userLng,
    address,
  });

  const [radius, setRadius] = useState<number>(
    userRadius ? userRadius : 100000
  );

  const { data: jobListing } = GetAllJobs({
    page,
    total: 50,
    lat: userLat,
    lng: userLng,
    radius,
  });

  useEffect(() => {
    if (!isEqual(userRadius, radius) && location?.lng) {
      dispatch(addLocation({ ...location, radius }));
    }
  }, [radius, location, dispatch, userRadius]);

  useEffect(() => {
    if (!isEqual(userRadius, radius) && location?.lng && userUid) {
      console.log('updating location', userRadius, location, radius);
      mutate({
        uid: userUid,
        ...location,
        radius,
      });
    }
  }, [radius, location, mutate, userUid, userRadius]);

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
      <InputSlider
        value={radius}
        setInputValue={setRadius}
        disabled={isError}
      />
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
  const stateUid = state.user.user?.uid;
  const stateLocation = state.location?.location;
  const { GetCoordinates } = CoordinateService();

  const { data: coordinatesData, isLoading } = GetCoordinates(stateUid);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <LocationComponent
            userUid={stateUid}
            userLng={
              stateLocation?.lng ? stateLocation?.lng : coordinatesData?.lng
            }
            userRadius={
              stateLocation?.radius
                ? stateLocation?.radius
                : coordinatesData?.radius
            }
            userLat={
              stateLocation?.lat ? stateLocation?.lat : coordinatesData?.lat
            }
          />
        </Container>
      )}
    </>
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
