import type { NextApiRequest, NextApiResponse } from 'next';
import type { PostData } from '../../@types/posts';
import { getData } from '../../contentful';

type Data = {
  posts: PostData[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { posts } = await getData();
  res.status(200).json({ posts: posts });
}
