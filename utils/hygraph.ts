import { GraphQLClient } from 'graphql-request';

export const createClient = (preview = false) => {
  const token = preview
    ? process.env.CONTENT_PREVIEW_API_TOKEN
    : process.env.CONTENT_API_TOKEN;
  const hygraph = new GraphQLClient(process.env.CONTENT_API_URL as string, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return hygraph;
};
