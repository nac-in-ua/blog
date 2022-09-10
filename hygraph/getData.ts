import { GraphQLClient, gql } from 'graphql-request';

export const hygraph = new GraphQLClient(
  process.env.CONTENT_API_URL as string,
  {
    headers: {
      authorization: `Bearer ${process.env.CONTENT_API_TOKEN}`,
    },
  }
);

export const getEmbed = async (id: string) => {
  const query = gql`
    query References($id: ID!) {
      post(where: { id: $id }) {
        content {
          references {
            ... on Post {
              id
              slug
              title
              shortDescription
            }
            ... on Category {
              id
              slug
              name
            }
          }
        }
      }
    }
  `;
  const data = await hygraph.request(query, { id });
  return await data.post;
};
