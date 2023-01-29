import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { page, total, lng, lat, radius } = req.query;
      const jobs = [
        {
          title: 'title',
          salary: 350,
          employmentType: 'Regular',
          imgUrl:
            'https://ethnicmediaservices.org/wp-content/uploads/2021/10/water-faucet.jpg',
        },
      ];
      res.status(200).json(jobs);
      break;
    case 'POST':
      res.status(200).json({ hello: 'world' });
      break;
    default:
      res.status(405).json({ method: req.method });
  }
}
