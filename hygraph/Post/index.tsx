import { client } from '../../utils/client';
import { gql } from '@apollo/client';
import { CategoriesItem } from '../Panel';

export interface KeywordData {
  name: string;
  id: number;
}

export type PostCover = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  category: CategoriesItem;
  keywords: KeywordData[];
  publishedDateTime: string;
  publishedAt: string;
  likes: number;
  views: number;
  isSaved: boolean;
};

export const getPostsCoverData = async (): Promise<PostCover[]> => {
  const { data } = await client.query({
    query: gql`
      query Posts {
        posts(orderBy: publishedDateTime_DESC) {
          id
          title
          slug
          shortDescription
          category {
            id
            name
            slug
          }
          keywords {
            id
            name
          }
          publishedDateTime
          publishedAt
          likes
          views
          isSaved
        }
      }
    `,
  });

  return data.posts;
};

export type Post = {
  id: string;
  title: string;
  markdown: string;
  slug: string;
  shortDescription: string;
  category: CategoriesItem;
  keywords: KeywordData[];
  createdAt: string;
  publishedDateTime: string;
  likes: number;
  views: number;
  isSaved: boolean;
};

export const getPostsData = async (): Promise<Post[]> => {
  const { data } = await client.query({
    query: gql`
      query Posts {
        posts {
          id
          markdown
          category {
            name
            slug
            id
          }
          slug
          title
          shortDescription
          keywords {
            id
            name
          }
          publishedDateTime
          views
          likes
          isSaved
        }
      }
    `,
  });

  return data.posts;
};

export const getPostsSlugs = async (): Promise<string[]> => {
  const { data } = await client.query({
    query: gql`
      query Posts {
        posts {
          slug
        }
      }
    `,
  });

  return data.posts.map((post: Post) => post.slug);
};
