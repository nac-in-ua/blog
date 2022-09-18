import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!req.query.id) {
      res.status(400).json({ message: 'Missing post ID.' });
      return;
    }
    const id = req.query.id.toString();

    if (req.method === 'GET') {
      const count = await prisma.post.findUnique({
        select: {
          _count: {
            select: {
              likedBy: true,
            },
          },
        },
        where: {
          id,
        },
      });

      return res.status(200).json({ likes: count?._count?.likedBy.toString() });
    }
  } catch (error: any | unknown) {
    return res.status(500).json({ message: error.message });
  }
}
