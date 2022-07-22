import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';

function MyApp({ Component, pageProps }: AppProps) {
  const { categories, category = '' } = pageProps;  

  return (
    <Layout categories={categories} category={category}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
