import styled, { keyframes } from 'styled-components';
import { fadeInDown } from 'react-animations';
import React, { useEffect, useState, createContext, useCallback } from 'react';
import hexToRgb from 'utils/hexToRgb';
import isEmpty from 'lodash/isEmpty';
import { MessageNotificationContextType } from 'types';
import { CloseOutlined } from '@ant-design/icons';

export const MessageNotificationContext =
  createContext<MessageNotificationContextType | null>(null);

interface MessageProviderProps {
  children: React.ReactNode;
}
const MessageProvider = ({ children }: MessageProviderProps) => {
  const [messageText, setMessageText] = useState('');
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (messageText) {
      timeout = setTimeout(() => {
        setMessageText('');
      }, 1000 * 10);
    }

    return () => {
      //cleanup on unload
      clearTimeout(timeout);
    };
  }, [messageText]);

  const handleClose = useCallback(() => setMessageText(''), []);

  return (
    <MessageNotificationContext.Provider
      value={{ messageText, setMessageText }}
    >
      <Container isHidden={isEmpty(messageText)}>
        {!isEmpty(messageText) && (
          <MessageContainer>
            <MessageTextContainer>{messageText}</MessageTextContainer>
            <CloseContainer isHidden={isEmpty(messageText)}>
              <CloseOutlined onClick={handleClose} />
            </CloseContainer>
          </MessageContainer>
        )}
      </Container>
      {children}
    </MessageNotificationContext.Provider>
  );
};

const fadeInDownAnimation = keyframes`${fadeInDown}`;
// const fadeOutAnimation = keyframes`${fadeOut}`;

const Container = styled.div<{ isHidden: boolean }>`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 200vh;
  z-index: 9999999999999999;
  background-color: ${({ theme }) => hexToRgb(theme.colors.primary, 0.3)};
  ${({ isHidden }) => isHidden && `display: none`};
  overflow: hidden;
`;

const MessageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.white};
  justify-content: center;
  align-content: center;
  font-weight: bold;
  font-size: 30px;
  animation: 3s ${fadeInDownAnimation} forwards;
`;

const MessageTextContainer = styled.div`
  flex: 1;
  padding: 0px 10px 10px 10px;
  min-height: 10px;
  overflow: hidden;
`;

const CloseContainer = styled.div<{ isHidden: boolean }>`
  display: flex;
  position: relative;
  justify-content: right;
  padding-right: 10px;
  visibility: inherit;
  animation: 3s ${fadeInDownAnimation} forwards;
  svg {
    filter: invert(0);
    width: 20px;
    height: 20px;
  }
  ${({ isHidden }) => isHidden && `display: none`};
`;

export default React.memo(MessageProvider);
