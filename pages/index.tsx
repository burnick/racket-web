import React, { useState } from 'react';
import styled from 'styled-components';
import { ManilaLatLong } from 'types';
import JobList from 'components/JobList';

const App = () => {
  const [page, setPage] = useState<number>(0);

  return (
    <Container>
      <JobList
        lng={ManilaLatLong.lng as number}
        lat={ManilaLatLong.lat as number}
        radius={ManilaLatLong.radius as number}
        page={page}
        setPage={setPage}
      />
    </Container>
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
