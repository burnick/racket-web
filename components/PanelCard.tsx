import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

interface CardProps {
  title?: string;
  hoverable?: boolean;
  width?: number;
  loading?: boolean;
  bordered?: boolean;
  description?: string;
  children: React.ReactNode;
}

const { Meta } = Card;

const PanelCard = ({
  title,
  width = 35,
  loading = false,
  hoverable = false,
  description = '',
  bordered = false,

  children,
}: CardProps) => {
  return (
    <StyledCard
      hoverable={hoverable}
      bordered={bordered}
      title={
        title ? <MetaStyled title={title} description={description} /> : null
      }
      width={width}
      loading={loading}
      withtitle={title}
    >
      {children}
    </StyledCard>
  );
};

const StyledCard = styled(Card)<{ width: number; withtitle?: string }>`
  width: ${({ width }) => width}%;
  min-width: 300px;

  ${({ withtitle }) =>
    !withtitle &&
    `display: flex;
    text-align: center;
    justify-content: center;
    `}
  margin-bottom: 30px;

  .ant-card-head {
    min-height: 50px;
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
    text-transform: capitalize;
  }

  .ant-card-head-title {
    font-size: 1.2em;
    font-weight: bold;
  }

  .ant-card-body {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 190px;
  }

  @media (pointer: none), (pointer: coarse) {
    width: 100%;
    max-width: 100%;
  }
`;

const MetaStyled = styled(Meta)`
  .ant-card-meta-title {
    color: ${(props) => props.theme.colors.white};
  }
`;

export default React.memo(PanelCard);
