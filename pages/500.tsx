import type { GetStaticProps, NextPage } from 'next';
import type { ICategoryData } from '../@types/posts';
import Head from 'next/head';
import { getData } from '../hygraph/getData';

type PropsType = {
  categories: ICategoryData[];
};

const FiveOhOh: NextPage<PropsType> = () => {
  return (
    <>
      <Head>
        <title>nac blog: 500</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div className="flex justify-center">
        <div className="flex">500 | Oups...</div>
      </div>
    </>
  );
};

export default FiveOhOh;

export const getStaticProps: GetStaticProps = async () => {
  const { categories } = await getData();

  return {
    props: {
      categories,
    },
    revalidate: 1,
  };
};