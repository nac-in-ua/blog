import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { GetStaticPaths } from 'next';
import { getPageData } from '../../hygraph/Page';
import { getPostBySlug, getPostsSlugs, Post } from '../../hygraph/Post';

import { MDXRemote } from 'next-mdx-remote';
import { mdxToHtml } from '../../lib/mdx';
import components from '../../components/MDXComponents';
import Comments from '../../components/Comments';
import { Category } from '../../components/Badges';
import Views from '../../components/Activity/Views';
import Likes from '../../components/Activity/Likes';
import Bookmark from '../../components/PostTile/Bookmark';
import { useEffect } from 'react';

type PostPropTypes = {
  post: Post;
  readingTime: string;
  markdown: any;
};

const Post = ({ post, markdown, readingTime }: PostPropTypes) => {
  const { title, id, category, likes, isSaved } = post;

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${id}`, {
        method: 'POST',
      });

    registerView();
  }, [id]);

  return (
    <>
      <Head>
        <title>{`nac blog: ${post.title}`}</title>
      </Head>
      <div className="flex flex-col">
        <div className="-ml-0.5 flex">
          <Category category={category} />
        </div>
        <div className="mt-2 text-3xl font-bold text-gray-700">{title}</div>
        <div>Reading time: {readingTime}</div>
        <div className="prose max-w-none text-gray-700">
          <MDXRemote {...markdown} components={components} />
        </div>
        <div className="mt-8 flex flex-row gap-2">
          <Views postId={id} />
          <Likes postId={id} />
          <Bookmark postId={id} />
        </div>
        <div className="mt-8 flex scroll-mt-16 flex-col gap-2">
          <Comments postId={id} />
        </div>
      </div>
    </>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getPostsSlugs();

  return {
    paths: slugs.map((slug: string) => ({
      params: {
        post_slug: slug,
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  if (!params) {
    return { notFound: true };
  }

  const { panel, header } = await getPageData('post');

  const post = await getPostBySlug(params.post_slug as string);
  if (!post) {
    return { notFound: true };
  }

  const { html, readingTime } = await mdxToHtml(post.markdown);

  return {
    props: {
      post,
      categories: header.navbar.categories,
      panel,
      markdown: html,
      readingTime,
    },
    revalidate: 1,
  };
};
