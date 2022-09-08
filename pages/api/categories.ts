import type { NextApiRequest, NextApiResponse } from 'next';
import type { ICategoryData } from '../../@types/posts';
import { getData } from '../../hygraph/getData';

type Data = {
  categories: ICategoryData[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { categories } = await getData();
  res.status(200).json({ categories: categories });
}
