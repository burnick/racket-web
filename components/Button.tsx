import React from 'react';
import { ConfigProvider, Button, theme } from 'antd';
import defaultTheme from 'default.theme.json';
import { ButtonTypes } from 'types';

interface ButtonProps {
  onClick?: () => void;
  label?: string;
  size?: string;
  type?: ButtonTypes;
  htmlType?: 'button' | 'reset' | 'submit' | undefined;
  children: React.ReactNode;
  disabled?: boolean;
}

const App: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'primary',
  htmlType = 'button',
  disabled = false,
}) => (
  <ConfigProvider
    theme={{
      algorithm: theme.defaultAlgorithm,
      token: {
        colorPrimary:
          htmlType === 'reset'
            ? defaultTheme.colors.danger
            : defaultTheme.colors.primary,
        colorBorderBg: defaultTheme.colors.primary,
        colorBgTextActive: defaultTheme.colors.primary,
      },
    }}
  >
    <Button
      size="large"
      type={type}
      htmlType={htmlType}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  </ConfigProvider>
);

export default App;
