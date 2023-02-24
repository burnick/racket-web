import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import hexToRgb from 'src/utils/hexToRgb';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-position: row;
  left: 50%;
  top: 50%;
  transform: translate(-0%, -0%);
  color: #ffffff;
  top: 0;
  left: 0;
  min-height: 100vh;
  background-color: ${(props) =>
    hexToRgb(props.theme.colors.primary, 0.5)} !important;
  opacity: 0.5;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 9999;
`;

const Loading = ({ tip }: { tip?: string }) => {
  return (
    <Container>
      <Spin tip={tip || 'Please wait...'} />
    </Container>
  );
};

export default Loading;
