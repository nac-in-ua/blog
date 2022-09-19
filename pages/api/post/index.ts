import type { NextApiRequest, NextApiResponse } from 'next';
import { getPostsCoverData } from '../../../hygraph/Post';
import { prisma } from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const posts = await getPostsCoverData();
      res.status(200).json({ ids: posts.map((post) => post.id) });
    } catch (error: any | unknown) {
      return res.status(500).json({ message: error.message });
    }
  }
}
