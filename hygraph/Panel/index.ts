import { client } from '../../utils/client';
import PanelQuery from '../../queries/Panel.graphql';

type PostsItem = {
  id: string;
  slug: string;
  title: string;
};

export type CategoriesItem = {
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
  const { data } = await client.query({
    query: PanelQuery,
    variables: { id },
  });

  return data.panel;
};
