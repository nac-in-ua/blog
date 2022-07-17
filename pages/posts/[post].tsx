import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { IPost, IPostFields } from '../../@types/generated/contentful';
import { Asset } from 'contentful';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { GetStaticPaths } from 'next';
import client from '../../contentful/contenful';

type PostPropTypes = {
  post: IPost;
};

type ImageNode = {
  data: {
    target: Asset;
  };
};

const renderOption = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      return (
        <Image
          src={`https:${node.data.target.fields.file.url}`}
          height={node.data.target.fields.file.details.image!.height}
          width={node.data.target.fields.file.details.image!.width}
          alt={node.data.target.fields.title}
        />
      );
    },
  },
};

const Post = ({ post }: PostPropTypes) => {
  return (
    <>
      <Head>
        <title>{post.fields.title}</title>
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
  const data = await client.getEntries<IPostFields>({
    content_type: 'post',
    select: 'fields.slug',
  });

  return {
    paths: data.items.map((item) => {
      return {
        params: {
          post: item.fields.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await client.getEntries<IPostFields>({
    content_type: 'post',
    limit: 1,
    // select: 'fields.slug, fields.title, fields.body',
    'fields.slug': params!.post,
  });

  return {
    props: {
      post: data.items[0],
    },
  };
};
