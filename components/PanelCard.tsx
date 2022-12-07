import React from 'react'
import { Card } from 'antd'
import styled from 'styled-components'

interface CardProps {
  title: string
  width?: number
  loading?: boolean
  bordered?: boolean
  children: React.ReactNode
}

const PanelCard = ({
  title = 'test',
  width = 35,
  loading = false,
  bordered = false,
  children,
}: CardProps) => {
  return (
    <StyledCard
      bordered={bordered}
      title={title}
      width={width}
      loading={loading}
    >
      {children}
    </StyledCard>
  );
};

const StyledCard = styled(Card)<{ width: number }>`
  width: ${({ width }) => width}%;

  .ant-card-head {
    min-height: 50px;
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
  }

  .ant-card-head-title {
    font-size: 1.2em;
    font-weight: bold;
  }

  .ant-card-body {
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 190px;
  }

  @media (pointer: none), (pointer: coarse) {
    width: 90%;
  }
`;

export default React.memo(PanelCard)
