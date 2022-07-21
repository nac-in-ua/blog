import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {
  IPost,
  IPostFields,
  ICategoryFields,
} from '../../@types/generated/contentful';
import { BLOCKS, Block, Inline } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { GetStaticPaths } from 'next';
import client from '../../contentful/contenful';

type PostPropTypes = {
  post: IPost;
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
  console.log(post.fields.title);

  return (
    <>
      <Head>
        <title>{`nac blog: ${post.fields.title}`}</title>
      </Head>
      <div>
        <h1>{post.fields.title}</h1>
        <span>
          {documentToReactComponents(post.fields.body!, renderOption)}
        </span>
      </div>
    </>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const { items } = await client.getEntries<IPostFields>({
    content_type: 'post',
    select: 'fields.slug',
  });

  const paths = items.map((item) => {
    return {
      params: {
        post_slug: item.fields.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { items } = await client.getEntries<IPostFields>({
    content_type: 'post',
    'fields.slug': params!.post_slug,
  });

  const categoryEntries = await client.getEntries<ICategoryFields>({
    content_type: 'category',
  });

  return {
    props: {
      post: items[0],
      categories: categoryEntries.items,
    },
    revalidate: 1,
  };
};
