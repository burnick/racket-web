import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

interface CardProps {
  title: string;
  width?: number;
  loading?: boolean;
  bordered?: boolean;
  imgUrl: string;
  description?: string;
}

const { Meta } = Card;

const PanelCard = ({
  title = 'test',
  width = 240,
  loading = false,

  description = '',
  bordered = false,
  imgUrl,
}: CardProps) => {
  return (
    <Card
      hoverable
      bordered={bordered}
      style={{ width }}
      cover={<img alt="example" src={imgUrl} />}
      loading={loading}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default React.memo(PanelCard);
