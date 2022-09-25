import { client } from '../../utils/client';
import { CategoriesItem } from '../Panel';
import {
  PostBySlug,
  PostsSlugs,
  PostsCover,
  PostSlugAndCategorySlugById,
} from '../../queries/Post.graphql';

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
  publishedAt: string;
  likes: number;
  views: number;
  isSaved: boolean;
};

export const getPostsCoverData = async (): Promise<PostCover[]> => {
  const { data } = await client.query({ query: PostsCover });
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
  publishedDateTime: string;
  likes: number;
  views: number;
  isSaved: boolean;
};

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const { data } = await client.query({
    query: PostBySlug,
    variables: {
      slug,
    },
  });

  return data.post;
};

type RevalidationData = {
  postSlug: string;
  categorySlug: string;
};

export const getPostSlugAndCategorySlugById = async (
  id: string
): Promise<RevalidationData> => {
  const { data } = await client.query({
    query: PostSlugAndCategorySlugById,
    variables: {
      id,
    },
  });

  return {
    postSlug: data.post.slug,
    categorySlug: data.post.category.slug,
  };
};

export const getPostsSlugs = async (): Promise<string[]> => {
  const { data } = await client.query({
    query: PostsSlugs,
  });

  return data.posts.map((post: Post) => post.slug);
};
