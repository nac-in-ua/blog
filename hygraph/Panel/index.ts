import { hygraph } from '../getData';
import { gql } from 'graphql-request';

type PostsItem = {
  id: string;
  slug: string;
  title: string;
};

type CategoriesItem = {
  id: string;
  slug: string;
  name: string;
};

export enum WidgetTypes {
  Categories = 'categories',
  Posts = 'posts',
}

export type CategoriesWidget = {
  id: string;
  name: string;
  type: WidgetTypes.Categories;
  widgetContent: {
    categories: CategoriesItem[];
  };
};

export type PostsWidget = {
  id: string;
  name: string;
  type: WidgetTypes.Posts;
  widgetContent: {
    posts: PostsItem[];
  };
};

export type PanelWidget = PostsWidget | CategoriesWidget;

export type Panel = {
  id: string;
  widgets: PanelWidget[];
};

export const getPanelData = async (id: string): Promise<Panel> => {
  const query = gql`
    query ($id: ID!) {
      panel(where: { id: $id }) {
        id
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
          type
        }
      }
    }
  `;
  const data = await hygraph.request(query, { id });

  return data.panel;
};
