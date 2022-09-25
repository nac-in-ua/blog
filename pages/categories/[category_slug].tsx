import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { GetStaticPaths } from 'next';
import PostTile from '../../components/PostTile';
import { getPageData } from '../../hygraph/Page';
import { CategoriesItem } from '../../hygraph/Panel';
import { getPostsCoverData, PostCover } from '../../hygraph/Post';

type PostPropTypes = {
  posts: PostCover[];
  category: CategoriesItem;
};

const Category: NextPage<PostPropTypes> = ({ category, posts }) => {
  const relevantPosts = posts.filter((post) => {
    return post.category.slug === category.slug;
  });

  return (
    <>
      <Head>
        <title>{`nac blog: ${category.name}`}</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div className="flex flex-col">
        {relevantPosts.map((post) => (
          <PostTile key={post.title} post={post} />
        ))}
      </div>
    </>
  );
};

export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
  const { header } = await getPageData('category');

  return {
    paths: header.navbar.categories.map((category: CategoriesItem) => {
      return {
        params: {
          category_slug: category.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const posts = await getPostsCoverData(preview);
  const { panel, header } = await getPageData('category');

  return {
    props: {
      posts,
      category: header.navbar.categories.filter(
        (category: CategoriesItem) => category.slug === params!.category_slug
      )[0],
      categories: header.navbar.categories,
      panel,
      preview,
    },
    revalidate: 1,
  };
};
