import React, { useState } from 'react';
import styled from 'styled-components';
import { store } from 'store';
import { CoordinateService } from 'hooks/useCoordinateService';
import Loading from 'components/Loading';
import LocationMap from 'components/LocationMap';
import JobList from 'components/JobList';

const Home = () => {
  const [page, setPage] = useState<number>(0);
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
          <LocationMap
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
            showJobLocations={true}
          />

          <JobList
            lng={coordinatesData.lng}
            lat={coordinatesData.lat}
            radius={coordinatesData.radius || 30000}
            page={page}
            setPage={setPage}
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

export default Home;
