import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';
// import { unstable_getServerSession } from 'next-auth/next';
// import { authOptions } from '../auth/[...nextauth]';
// import { getSession } from 'next-auth/react';
// import { User } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await unstable_getServerSession(req, res, authOptions);
  // const session = await getSession({ req });

  // if (!session) {
  //   res.status(401).json({ message: 'You must be logged in.' });
  //   return;
  // }

  try {
    if (!req.query.id) {
      res.status(400).json({ message: 'Missing post ID.' });
      return;
    }
    const id = req.query.id.toString();

    if (req.method === 'POST') {
      const postViews = await prisma.post.upsert({
        where: {
          id: id?.toString(),
        },
        create: {
          id,
        },
        update: {
          views: {
            increment: 1,
          },
        },
        select: {
          views: true,
        },
      });
      return res.status(200).json({ views: postViews?.views?.toString() });
    }

    if (req.method === 'GET') {
      const postViews = await prisma.post.findFirst({
        where: {
          id: req.query.id?.toString(),
        },
        select: {
          views: true,
        },
      });
      return res.status(200).json({ views: postViews?.views?.toString() });
    }
  } catch (error: any | unknown) {
    return res.status(500).json({ message: error.message });
  }

  // ----------------------------------------------

  // if (session) {
  //   if (session.user) {
  //     const userInfo: User | null = await prisma.user.findUnique({
  //       where: {
  //         email: session.user.email || null || undefined,
  //       },
  //     });
  //     console.log(userInfo);

  //     if (req.method === 'POST') {
  //       try {
  //         const id = req.query.id.toString();

  //         const post = await prisma.post.upsert({
  //           where: {
  //             id,
  //           },
  //           create: {
  //             id,
  //           },
  //           update: {
  //             views: {
  //               increment: 1,
  //             },
  //             likedBy: {
  //               connect: {
  //                 id: userInfo?.id,
  //               },
  //             },
  //             savedBy: {
  //               connect: {
  //                 id: userInfo?.id,
  //               },
  //             },
  //           },
  //         });

  //         return res.status(200).json({
  //           newPost: {
  //             id: post.id,
  //             views: post.views.toString(),
  //           },
  //         });
  //       } catch (e) {
  //         return res.status(500).json({ message: e.message });
  //       }
  //     }

  //     if (req.method === 'GET') {
  //       console.log(req);

  //       const isLiked = await prisma.post.findFirst({
  //         where: {
  //           likedBy: {
  //             some: {
  //               id: userInfo?.id,
  //             },
  //           },
  //         },
  //       });

  //       const isL = await prisma.user.findFirst({
  //         // select: {
  //         //   likedPosts: {
  //         //     select: {
  //         //       id: true,
  //         //     },
  //         //   },
  //         // },
  //         where: {
  //           likedPosts: {
  //             some: {
  //               id: req.query.id.toString(),
  //             },
  //           },
  //         },
  //       });
  //       console.log(isL);

  //       return (
  //         res
  //           .status(200)
  //           // .json({ views_total: totalViews._sum.views.toString() });
  //           .json({
  //             // isLiked: isLiked.some((item) => item.id === req.query.id),
  //             isLiked: !!isL,
  //           })
  //       );
  //     }

  //     // return res.json({
  //     //   email: userInfo?.email,
  //     // });
  //   }
  // }

  // try {
  //   const id = req.query.id.toString();

  //   if (req.method === 'POST') {
  //     const newOrUpdatedViews = await prisma.views.upsert({
  //       where: { postId: id },
  //       create: {
  //         postId: id,
  //       },
  //       update: {
  //         count: {
  //           increment: 1,
  //         },
  //       },
  //     });

  //     return res.status(200).json({
  //       total: newOrUpdatedViews.count.toString(),
  //     });
  //   }

  //   if (req.method === 'GET') {
  //     const views = await prisma.views.findUnique({
  //       where: {
  //         postId: id,
  //       },
  //     });

  //     return res.status(200).json({ total: views.count.toString() });
  //   }
  // } catch (e) {
  //   return res.status(500).json({ message: e.message });
  // }

  // return res.status(403).json({ message: 'Unauthorized.' });
}
