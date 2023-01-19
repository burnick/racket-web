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
}

const { Meta } = Card;

const PanelCard = ({
  title = 'test',
  width = 240,
  loading = false,

  description,
  bordered = false,
  imgUrl,
}: CardProps) => {
  return (
    <Card
      // hoverable
      bordered={bordered}
      style={{ width, textAlign: 'start' }}
      cover={imgUrl ? <Image alt={title} src={imgUrl} /> : <Empty />}
      loading={loading}
      actions={[<EllipsisOutlined key="ellipsis" />]}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default React.memo(PanelCard);
