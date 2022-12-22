import React from 'react';
import { ConfigProvider, Button, theme } from 'antd';
import defaultTheme from 'default.theme.json';

interface ButtonProps {
  onClick: () => void;
  label?: string;
  size?: string;
  children: React.ReactNode;
}

const App: React.FC<ButtonProps> = ({ children, onClick }) => (
  <ConfigProvider
    theme={{
      algorithm: theme.defaultAlgorithm,
      token: {
        colorPrimary: defaultTheme.colors.primary,
        colorBorderBg: defaultTheme.colors.primary,
        sizeLG: 100,
        sizeSM: 100,
        sizeMD: 200,
        colorBgTextActive: defaultTheme.colors.primary,
      },
    }}
  >
    <Button size="large" onClick={onClick}>
      {children}
    </Button>
  </ConfigProvider>
);

export default App;
