import type { NextApiRequest, NextApiResponse } from 'next';
import { getPostBySlug } from '../../hygraph/Post';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.query.secret !== process.env.PREVIEW_SECRET_TOKEN ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const post = await getPostBySlug(req.query.slug as string);
  if (!post) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  res.setPreviewData({});
  res.writeHead(307, { Location: `/post/${post.slug}` });
  res.end();
}
