import type { NextApiRequest, NextApiResponse } from 'next';
import type { IPostData } from '../../@types/posts';
import { getData } from '../../hygraph/getData';

type Data = {
  posts: IPostData[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { posts } = await getData();
  res.status(200).json({ posts: posts });
}
