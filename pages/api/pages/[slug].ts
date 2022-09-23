import type { NextApiRequest, NextApiResponse } from 'next';
import { gql, GraphQLClient } from 'graphql-request';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const hygraph = new GraphQLClient(process.env.CONTENT_API_URL as string, {
    headers: {
      authorization: `Bearer ${process.env.CONTENT_API_TOKEN}`,
    },
  });

  const query = gql`
    query Page($slug: String!) {
      page(where: { slug: $slug }) {
        id
        title
        slug
        header {
          id
          navbar {
            categories {
              id
              name
              slug
            }
          }
        }
        panel {
          widgets {
            id
            name
            type
            widgetContent {
              ... on CategoriesWidget {
                id
                categories {
                  id
                  name
                  slug
                }
              }
              ... on PostsWidget {
                id
                posts {
                  id
                  title
                  slug
                }
              }
            }
          }
        }
      }
    }
  `;

  switch (req.method) {
    case 'GET': {
      const { slug } = req.query;
      const { page } = await hygraph.request(query, { slug });
      res.status(200).json(page);
      break;
    }
  }
}
