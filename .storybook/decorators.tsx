import React from 'react';
import { ThemeProvider } from 'styled-components';
import { DecoratorFn } from '@storybook/react';
import theme from '../default.theme.json';
export const withMaxWidth: DecoratorFn = (StoryFn) => {
  return (
    <div
      style={{
        display: 'flex',
        width: 'auto',
        margin: 'auto',
        padding: 5,
        overflow: 'hidden',
        minHeight: '350px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',
        border: '1px solid red',
      }}
    >
      <ThemeProvider theme={theme}>
        <StoryFn />
      </ThemeProvider>
    </div>
  );
};

export const globalDecorators = [withMaxWidth];
