import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};
export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  /**Example response for api */
  res.status(200).json({ name: 'John Doe' });
};
