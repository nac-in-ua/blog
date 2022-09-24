import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { data, operation } = req.body;
    const { id } = data;

    if (!id || operation !== 'delete') {
      return res.status(400).json({ message: 'Missing post ID.' });
    }

    if (operation !== 'delete') {
      return res.status(400).json({ message: 'Wrong hook operation.' });
    }

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
      console.log('Deleting post...');

      const post = await prisma.post.delete({
        where: {
          id,
        },
      });

      console.log('Post deleted...', post);

      return res.status(200).json({ id: post.id });
    } catch (error: any | unknown) {
      return res.status(500).json({ message: error.message });
    }
  }
}
