import React, { useState } from 'react';
import styled from 'styled-components';
import { store } from 'store';
import { CoordinateService } from 'hooks/useCoordinateService';
import Loading from 'components/Loading';
import LocationMap from 'components/LocationMap';
import { JobService } from 'hooks/useJobService';
import JobList from 'components/JobList';

const App = () => {
  const [page, setPage] = useState<number>(0);
  const state = store.getState();
  const stateUid = state.user.user?.uid;
  const stateLocation = state.location?.location;
  const { GetCoordinates } = CoordinateService();
  const { GetAllJobs } = JobService();

  const { data: coordinatesData, isLoading } = GetCoordinates(stateUid);

  const { data: jobListing } = GetAllJobs({
    page,
    total: 50,
    lat: coordinatesData?.lat,
    lng: coordinatesData?.lng,
    radius: coordinatesData?.radius || 30000,
  });

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
            jobListing={jobListing?.data}
          />
          {!isLoading && jobListing?.data ? (
            <JobList
              jobListing={jobListing?.data}
              page={page}
              setPage={setPage}
            />
          ) : (
            <Loading />
          )}
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

export default App;
