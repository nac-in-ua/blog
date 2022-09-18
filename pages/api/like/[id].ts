import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { prisma } from '../../../utils/prisma';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'You must be logged in.' });
    }
    const postId = req.query.id!.toString();
    const userId = session.user.id;

    if (req.method === 'GET') {
      const data = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          likedPosts: {
            where: {
              id: postId,
            },
          },
        },
      });
      console.log('data', data);

      return res.status(200).json({ isLiked: data!.likedPosts.length > 0 });
    }

    if (req.method === 'POST') {
      const data = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          likedPosts: {
            where: {
              id: postId,
            },
          },
        },
      });

      if (data!.likedPosts.length > 0) {
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            likedPosts: {
              disconnect: {
                id: postId,
              },
            },
          },
        });
        return res.status(200).json({ id: postId });
      } else {
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            likedPosts: {
              connect: {
                id: postId,
              },
            },
          },
        });
        return res.status(200).json({ id: postId });
      }
    }
  } catch (error: any | unknown) {
    return res.status(500).json({ message: error.message });
  }
}
