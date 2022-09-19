import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { data, operation } = req.body;
    const { id } = data;
    const { verifyWebhookSignature } = require('@graphcms/utils');
    const secret = process.env.CONTENT_WEBHOOK_SECRET;
    const signature = req.headers['gcms-signature'];

    const isValid = verifyWebhookSignature({
      body: req.body,
      signature,
      secret,
    });

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid signature' });
    }

    try {
      if (!id) {
        return res.status(400).json({ message: 'Missing post ID.' });
      }
      if (operation === 'create') {
        const post = await prisma.post.create({
          data: {
            id,
          },
        });

        return res.status(200).json({ post });
      } else if (operation === 'delete') {
        const post = await prisma.post.delete({
          where: {
            id,
          },
        });
        return res.status(200).json({ post });
      }
    } catch (error: any | unknown) {
      return res.status(500).json({ message: error.message });
    }
  }
}
