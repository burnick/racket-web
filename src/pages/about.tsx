import PanelCard from 'components/PanelCard';
import React from 'react';
import styled from 'styled-components';

const About = () => {
  return (
    <Container>
      <PanelCard width={100}> About Page</PanelCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 10px;
`;
export default About;
