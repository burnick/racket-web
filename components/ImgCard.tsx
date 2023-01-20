import React from 'react';
import { Card, Image, Empty } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

interface CardProps {
  title: string;
  width?: number;
  loading?: boolean;
  bordered?: boolean;
  imgUrl?: string;
  description?: React.ReactElement;
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const { Meta } = Card;

const PanelCard = ({
  title = 'test',
  width = 240,
  loading = false,
  description,
  bordered = false,
  imgUrl,
  onClick,
}: CardProps) => {
  return (
    <Card
      // hoverable
      bordered={bordered}
      style={{ width, textAlign: 'start' }}
      cover={imgUrl ? <Image alt={title} src={imgUrl} /> : <Empty />}
      loading={loading}
      actions={[<EllipsisOutlined key="ellipsis" onClick={onClick} />]}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default React.memo(PanelCard);
