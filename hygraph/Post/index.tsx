import { client } from '../../utils/client';
import { gql } from '@apollo/client';
import { CategoriesItem } from '../Panel';
import { ElementNode } from '@graphcms/rich-text-types';

export interface KeywordData {
  name: string;
  id: number;
}

export interface CoverImage {
  url: string;
  alt: string;
  height: number;
  width: number;
  mimeType: string;
  fileName: string;
}

export type PostCover = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  category: CategoriesItem;
  keywords: KeywordData[];
  publishedDateTime: string;
  coverImage: CoverImage;
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
          coverImage {
            id
            url
            width
            height
            alt
          }
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
  content: {
    raw: {
      children: ElementNode[];
    };
  };
  coverImage: CoverImage;
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
          views
          likes
          isSaved
        }
      }
    `,
  });

  return data.posts;
};
