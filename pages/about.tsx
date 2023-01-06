import React from 'react';
import MainPage from 'components/MainPage';
import styled from 'styled-components';

const About = () => {
  return (
    <MainPage>
      <Container>About Page</Container>
    </MainPage>
  );
};

const Container = styled.div`
  display: flex;
  padding: 10px;
`;
export default About;
