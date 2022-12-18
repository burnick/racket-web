import { NextApiResponse } from 'next';

type Data = {
  name: string;
};
const Api = (res: NextApiResponse<Data>) => {
  /**Example response for api */
  res.status(200).json({ name: 'John Doe' });
};
export default Api;
