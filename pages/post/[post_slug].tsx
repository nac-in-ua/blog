import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticPaths } from 'next';
import { getEmbed } from '../../hygraph/getData';
import { RichText } from '@graphcms/rich-text-react-renderer';
import CoverImage from '../../components/PostTile/CoverImage';
import Link from 'next/link';
import CodeBlock from '../../components/CodeBlock';
import { EmbedReferences } from '@graphcms/rich-text-types';
import { getPageData } from '../../hygraph/Page';
import { getPostsData, Post } from '../../hygraph/Post';
import { CategoriesItem } from '../../hygraph/Panel';

type PostPropTypes = {
  post: Post;
  posts: Post[];
  categories: CategoriesItem[];
  embedReferences: EmbedReferences;
};

type SingleNode = {
  children: React.ReactNode;
};

const rendererData: any = {
  a: ({ children, openInNewTab, href, rel, ...rest }) => {
    if (href.match(/^https?:\/\/|^\/\//i)) {
      return (
        // eslint-disable-next-line react/jsx-no-target-blank
        <a
          className=""
          href={href}
          target={openInNewTab ? '_blank' : '_self'}
          rel={rel || 'noopener noreferrer'}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href}>
        <a {...rest}>{children}</a>
      </Link>
    );
  },
  class: ({ children, className }) => (
    <span className={`${className}`}>{children}</span>
  ),
  img: ({ src, altText, height, width }) => (
    <Image
      src={src}
      alt={altText}
      height={height}
      width={width}
      objectFit="cover"
    />
  ),
  video: ({ src, height, width }) => (
    <video width={width} height={height} controls>
      <source src={src} type="video/mp4" />
    </video>
  ),
  h1: ({ children }: SingleNode) => (
    <h1 className="my-2 text-4xl font-bold">{children}</h1>
  ),
  h2: ({ children }: SingleNode) => (
    <h2 className="my-2 text-3xl font-bold">{children}</h2>
  ),
  h3: ({ children }: SingleNode) => (
    <h3 className="my-2 text-2xl font-bold">{children}</h3>
  ),
  h4: ({ children }: SingleNode) => (
    <h4 className="my-2 text-xl font-bold">{children}</h4>
  ),
  h5: ({ children }: SingleNode) => (
    <h5 className="my-2 text-lg font-bold">{children}</h5>
  ),
  h6: ({ children }: SingleNode) => (
    <h6 className="text-md my-2 font-bold">{children}</h6>
  ),
  p: ({ children }: SingleNode) => (
    <div className="my-2 flex flex-row flex-wrap break-normal text-base font-normal">
      {children}
    </div>
  ),
  ul: ({ children }: SingleNode) => (
    <ul className="list-outside list-disc pl-4 text-base font-normal">
      {children}
    </ul>
  ),
  ol: ({ children }: SingleNode) => (
    <ol className="list-decimalReact.ReactNod list-outside pl-4 text-base font-normal">
      {children}
    </ol>
  ),
  li: ({ children }: SingleNode) => (
    <li className="text-base font-normal">{children}</li>
  ),
  table: ({ children }: SingleNode) => (
    <table className="border text-left text-sm text-gray-500">{children}</table>
  ),
  table_head: ({ children }: SingleNode) => (
    <thead className="bg-gray-200 text-xs text-gray-700">{children}</thead>
  ),
  table_header_cell: ({ children }: SingleNode) => (
    <th scope="col" className="border border-gray-300 py-1 px-2">
      {children}
    </th>
  ),
  table_body: ({ children }: SingleNode) => <tbody>{children}</tbody>,
  table_row: ({ children }: SingleNode) => (
    <tr className="border-b">{children}</tr>
  ),
  table_cell: ({ children }: SingleNode) => (
    <th className="border py-1 px-2">{children}</th>
  ),
  blockquote: ({ children }: SingleNode) => (
    <blockquote className="border-l-4 py-1 px-2">{children}</blockquote>
  ),
  bold: ({ children }: SingleNode) => (
    <strong className="font-bold">{children}</strong>
  ),
  italic: ({ children }: SingleNode) => <em>{children}</em>,
  underline: ({ children }: SingleNode) => <u>{children}</u>,
  code: ({ children }: SingleNode) => (
    <code className="bg-gray-100">{children}</code>
  ),
  code_block: ({ children }: SingleNode) => <CodeBlock>{children}</CodeBlock>,
  embed: {
    // ['Category']: (props) => {
    //   const { name, slug, isInline } = props;
    //   console.log(props);
    //   const el = isInline ? (
    //     <span className="flex flex-col border bg-yellow-200 p-1 my-2">
    //       <div className="flex bg-white font-bold">Category</div>
    //       <div className="flex">{name}</div>
    //       <div className="flex">{`/${slug}`}</div>
    //     </span>
    //   ) : (
    //     <div className="flex flex-col border bg-yellow-200 p-1 my-2">
    //       <div className="flex bg-white font-bold">Category</div>
    //       <div className="flex">{name}</div>
    //       <div className="flex">{`/${slug}`}</div>
    //     </div>
    //   );

    //   return el;
    // },
    ['Post']: (props) => {
      const { title, shortDescription, isInline } = props;
      console.log(props);

      const el = isInline ? (
        <span className="my-2 mr-2 flex flex-col border bg-gray-200 p-1">
          <div className="flex bg-white font-bold">Post</div>
          <div className="flex">{title}</div>
          <div className="flex">{shortDescription}</div>
        </span>
      ) : (
        <div className="my-2 flex flex-col border bg-gray-200 p-1">
          <div className="flex bg-white font-bold">Post</div>
          <div className="flex">{title}</div>
          <div className="flex">{shortDescription}</div>
        </div>
      );

      return el;
    },
  },
};

const Post = ({ post, categories, posts, embedReferences }: PostPropTypes) => {
  const { title, content, coverImage } = post;

  // console.log(content.raw);
  // console.log('categories: ', categories);
  // console.log(embedReferences);

  return (
    <>
      <Head>
        <title>{`nac blog: ${post.title}`}</title>
      </Head>
      <div className="flex flex-row">
        <div className="flex w-full flex-col break-all border bg-white p-2">
          <div className="">
            <CoverImage data={coverImage} />
          </div>
          <div className="mt-2 text-3xl font-bold text-gray-700">{title}</div>
          <div className="text-gray-700">
            <RichText
              content={content.raw}
              references={embedReferences}
              renderers={rendererData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPostsData();

  return {
    paths: posts.map((post: Post) => ({
      params: {
        post_slug: post.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await getPostsData();
  const { panel, header } = await getPageData('post');

  const post = posts.filter((post: Post) => post.slug === params!.post_slug)[0];

  const embedReferences = await getEmbed(post.id);

  return {
    props: {
      post,
      categories: header.navbar.categories,
      category: post.category,
      posts,
      embedReferences: embedReferences.content.references,
      panel,
    },
    revalidate: 1,
  };
};
