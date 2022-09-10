import { client } from '../../utils/client';
import { gql } from '@apollo/client';
import { CategoriesItem, Panel } from '../Panel';

export type Header = {
  id: string;
  navbar: {
    categories: CategoriesItem[];
  };
};

export type Page = {
  id: string;
  title: string;
  slug: string;
  header: Header;
  panel: Panel;
};

export const getPageData = async (slug: string): Promise<Page> => {
  const { data } = await client.query({
    query: gql`
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
    `,
    variables: { slug },
  });

  return data.page;
};
