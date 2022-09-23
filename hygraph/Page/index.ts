import { client } from '../../utils/client';
import PageQuery from '../../queries/Page.graphql';
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
    query: PageQuery,
    variables: { slug },
  });

  return data.page;
};
