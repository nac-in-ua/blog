import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { getSession } from 'next-auth/react';
import { User } from '@prisma/client';
import { id } from 'date-fns/locale';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    // const postId = req.query.postId.toString();

    // const userId = session?.user?.id.toString();

    if (req.method === 'GET') {
      try {
        // const post = await prisma.post.findFirst({
        //   where: {
        //     id: req.query.postId.toString(),
        //   },
        // });
        const likedPost = await prisma.post.findFirst({
          where: {
            AND: [
              { id: req.query.postId.toString() },
              {
                likedBy: {
                  some: {
                    email: session?.user?.email.toString(),
                  },
                },
              },
            ],
          },
        });
        console.log(likedPost);

        return res.status(200).json({
          isLiked: !!likedPost,
        });
      } catch (e) {
        return res.status(500).json({ message: e.message });
      }
    }
  }

  return res.status(403).json({ message: 'Unauthorized.' });
}
