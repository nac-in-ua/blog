import { GraphQLClient, gql } from 'graphql-request';

export const hygraph = new GraphQLClient(
  process.env.CONTENT_API_URL as string,
  {
    headers: {
      authorization: `Bearer ${process.env.CONTENT_API_TOKEN}`,
    },
  }
);

const getPosts = async () => {
  const query = gql`
    {
      posts {
        id
        content {
          html
          raw
          references {
            ... on Category {
              id
              name
              slug
            }
            ... on Post {
              id
              slug
              title
            }
          }
        }
        category {
          name
          slug
          id
        }
        slug
        title
        shortDescription
        coverImage {
          url
          height
          width
          mimeType
          fileName
          alt
        }
        keywords {
          id
          name
        }
        publishedDateTime
      }
    }
  `;
  const data = await hygraph.request(query);
  return data.posts;
};

const getCategories = async () => {
  const query = gql`
    {
      categories {
        id
        name
        slug
      }
    }
  `;
  const data = await hygraph.request(query);
  return data.categories;
};

export const getNavbar = async (name: string) => {
  const query = gql`
    query Navbar($name: String!) {
      navbar(where: { name: $name }) {
        id
        categories {
          id
          name
          slug
        }
        name
      }
    }
  `;

  const data = await hygraph.request(query, { name });
  return await data.navbar;
};

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

export const getData = async () => {
  const posts = await getPosts();
  const categories = await getCategories();
  return { posts, categories };
};
