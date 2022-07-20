import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import {
  ICategory,
  ICategoryFields,
  IPostFields,
  IPost,
} from '../../@types/generated/contentful';
import { GetStaticPaths } from 'next';
import client from '../../contentful/contenful';
import { sortedPosts } from '../../utils/posts';
import PostTile from '../../components/PostTile';

type PostPropTypes = {
  posts: IPost[];
  category: ICategory;
  categories: ICategory[];
};

const Category: NextPage<PostPropTypes> = ({ category, posts, categories }) => {
  const relevantPosts = posts.filter((post) =>
    post.fields.categories.some(
      (cat) =>
        cat.fields.name.toLocaleLowerCase() ===
        category.fields.name.toLocaleLowerCase()
    )
  );

  return (
    <>
      <Head>
        <title>{`nac blog: ${category.fields.name}`}</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div className="flex max-w-2xl flex-col">
        {sortedPosts(relevantPosts).map((post) => (
          <PostTile key={post.sys.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default Category;

export const getStaticPaths: GetStaticPaths = async () => {
  const { items } = await client.getEntries<ICategoryFields>({
    content_type: 'category',
    select: 'fields.name',
  });

  const paths = items.map((item) => {
    return {
      params: {
        category: item.fields.name.toLowerCase(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryEntries = await client.getEntries<ICategoryFields>({
    content_type: 'category',
  });

  const postEntries = await client.getEntries<IPostFields>({
    content_type: 'post',
  });

  return {
    props: {
      posts: postEntries.items,
      category: categoryEntries.items.filter(
        (item) => item.fields.name.toLowerCase() === params!.category
      )[0],
      categories: categoryEntries.items,
    },
    revalidate: 1,
  };
};
