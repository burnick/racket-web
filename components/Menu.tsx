import { Layout } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      left sidebar
    </Sider>
  );
};

const Sider = styled(Layout.Sider)``;

export default App;
