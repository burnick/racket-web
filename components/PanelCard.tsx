import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

interface CardProps {
  title: string;
  hoverable?: boolean;
  width?: number;
  loading?: boolean;
  bordered?: boolean;

  description?: string;
  children: React.ReactNode;
}

const { Meta } = Card;

const PanelCard = ({
  title = 'test',
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
      title={<MetaStyled title={title} description={description} />}
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
    text-transform: capitalize;
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
  min-width: 300px;

  @media (pointer: none), (pointer: coarse) {
    width: 50%;
  }
`;

const MetaStyled = styled(Meta)`
  .ant-card-meta-title {
    color: ${(props) => props.theme.colors.white};
  }
`;

export default React.memo(PanelCard);
