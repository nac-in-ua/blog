import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { IPost, IPostFields } from '../@types/generated/contentful';
import client from '../contentful/contenful';
import PostTile from '../components/PostTile';

type HomePropsType = {
  posts: IPost[];
};

const sortedPosts = (posts: IPost[]) => {
  return posts.sort((a, b) => {
    return (
      new Date(b.sys.createdAt).getTime() - new Date(a.sys.createdAt).getTime()
    );
  });
};

const Home: NextPage<HomePropsType> = ({ posts }) => {
  console.log(posts);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="flex h-10 mx-auto bg-slate-300 mb-10">navbar</nav>
      <main className="flex justify-center">
        <div className="flex w-3/4 flex-col">
          {sortedPosts(posts).map((post) => (
            <PostTile key={post.sys.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.getEntries<IPostFields>({
    content_type: 'post',
  });

  return {
    props: {
      posts: data.items,
    },
    revalidate: 1,
  };
};
