import { NextApiRequest, NextApiResponse } from 'next';
import { getPostSlugAndCategorySlugById } from '../../hygraph/Post';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET || !req.query.id) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  if (!req.query.id) {
    return res.status(400).json({ message: 'Missing post ID.' });
  }

  const { id } = req.query;
  const { postSlug, categorySlug } = await getPostSlugAndCategorySlugById(
    id as string
  );
  console.log(`Revalidating ${postSlug} in ${categorySlug}`);

  try {
    await Promise.all([
      res.revalidate('/'),
      res.revalidate(`/post/${postSlug}`),
      res.revalidate(`/categories/${categorySlug}`),
    ]);
    return res.json({ revalidated: true });
  } catch (err: any | unknown) {
    return res.status(500).send('Error revalidating');
  }
}
