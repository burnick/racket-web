import styled, { keyframes } from 'styled-components';
import { fadeInDown } from 'react-animations';
import React, { useEffect, useState, createContext, useCallback } from 'react';
import hexToRgb from 'utils/hexToRgb';
import isEmpty from 'lodash/isEmpty';
import { ErrorContextType } from 'types';
import { CloseOutlined } from '@ant-design/icons';

export const ErrorContext = createContext<ErrorContextType | null>(null);

interface ErrorProviderProps {
  children: React.ReactNode;
}
const ErrorProvider = ({ children }: ErrorProviderProps) => {
  const [errorText, setErrorText] = useState('');
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (errorText) {
      timeout = setTimeout(() => {
        setErrorText('');
      }, 1000 * 10);
    }

    return () => {
      //cleanup on unload
      clearTimeout(timeout);
    };
  }, [errorText]);

  const handleClose = useCallback(() => setErrorText(''), []);

  return (
    <ErrorContext.Provider value={{ errorText, setErrorText }}>
      <Container isHidden={isEmpty(errorText)}>
        {!isEmpty(errorText) && <ErrorContainer> {errorText}</ErrorContainer>}
        <CloseContainer isHidden={isEmpty(errorText)}>
          <CloseOutlined onClick={handleClose} />
        </CloseContainer>
      </Container>
      {children}
    </ErrorContext.Provider>
  );
};

const fadeInDownAnimation = keyframes`${fadeInDown}`;
// const fadeOutAnimation = keyframes`${fadeOut}`;

const Container = styled.div<{ isHidden: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999999999999999;
  background-color: ${({ theme }) => hexToRgb(theme.colors.primary, 0.3)};
  ${({ isHidden }) => isHidden && `display: none`};
`;

const ErrorContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 10%;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.white};
  justify-content: center;
  align-content: center;
  font-weight: bold;
  font-size: 30px;
  animation: 3s ${fadeInDownAnimation} forwards;
`;

const CloseContainer = styled.div<{ isHidden: boolean }>`
  display: flex;
  position: relative;
  width: 99%;
  justify-content: right;
  margin-top: 40px;
  padding-right: 2%;
  visibility: inherit;
  animation: 3s ${fadeInDownAnimation} forwards;
  svg {
    filter: invert(100%);
  }
  ${({ isHidden }) => isHidden && `display: none`};
`;

export default React.memo(ErrorProvider);
