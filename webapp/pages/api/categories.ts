import type { NextApiRequest, NextApiResponse } from 'next';
import type { categoryData } from '../../@types/posts';
import { getData } from '../../contentful';

type Data = {
  categories: categoryData[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { categories } = await getData();
  res.status(200).json({ categories: categories });
}
