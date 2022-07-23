import type { GetStaticProps } from 'next';
import type { PostData } from '../../@types/posts';
import Head from 'next/head';
import Image from 'next/image';
import { BLOCKS, Block, Inline } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { GetStaticPaths } from 'next';
import { getData } from '../../contentful';

type PostPropTypes = {
  post: PostData;
};

const renderOption = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
      const { file, title } = node.data.target.fields;
      return (
        <Image
          src={`https:${file.url}`}
          height={file.details.image!.height}
          width={file.details.image!.width}
          alt={title}
        />
      );
    },
  },
};

const Post = ({ post }: PostPropTypes) => {
  return (
    <>
      <Head>
        <title>{`nac blog: ${post.title}`}</title>
      </Head>
      <div>
        <h1>{post.title}</h1>
        <span>{documentToReactComponents(post.body!, renderOption)}</span>
      </div>
    </>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await getData();

  return {
    paths: posts.map((post) => ({
      params: {
        post_slug: post.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { posts, categories } = await getData();
  const post = posts.filter(
    (post: PostData) => post.slug === params!.post_slug
  )[0];
  const category = post.categories[0].fields.name;

  return {
    props: {
      post,
      categories,
      category,
    },
    revalidate: 1,
  };
};
