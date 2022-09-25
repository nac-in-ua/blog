import { CategoriesItem } from '../Panel';
import {
  PostBySlug,
  PostsSlugs,
  PostsCover,
  PostSlugAndCategorySlugById,
} from '../../queries/Post.graphql';
import { createClient } from '../../utils/hygraph';

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

export const getPostsCoverData = async (
  preview: boolean = false
): Promise<PostCover[]> => {
  const localClient = createClient(preview);
  const { posts } = await localClient.request(PostsCover);
  return posts;
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

export const getPostBySlug = async (
  slug: string,
  preview: boolean = false
): Promise<Post> => {
  const localClient = createClient(preview);
  const { post } = await localClient.request(PostBySlug, { slug });
  return post;
};

type RevalidationData = {
  postSlug: string;
  categorySlug: string;
};

export const getPostSlugAndCategorySlugById = async (
  id: string
): Promise<RevalidationData> => {
  const localClient = createClient(false);
  const { post } = await localClient.request(PostSlugAndCategorySlugById, {
    id,
  });

  return {
    postSlug: post.slug,
    categorySlug: post.category.slug,
  };
};

export const getPostsSlugs = async (preview = false): Promise<string[]> => {
  const localClient = createClient(preview);
  const { posts } = await localClient.request(PostsSlugs);

  return posts.map((post: Post) => post.slug);
};
