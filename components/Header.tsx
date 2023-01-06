import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import Image from 'next/image';

const Header = () => {
  return (
    <StyledHeader>
      <Image
        src="/racketlogo.png"
        width={85}
        height={65}
        alt={'racket logo'}
        priority={true}
      />
    </StyledHeader>
  );
};

const StyledHeader = styled(Layout.Header)`
  padding-inline: 15px !important;
  background: ${(props) => props.theme.colors.primary} !important;
  color: ${(props) => props.theme.colors.white} !important;
`;

export default Header;
