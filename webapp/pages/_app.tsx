import '../styles/globals.css';
import type { AppProps } from 'next/app';
import GeneralLayout from '../components/Layouts/General';

function MyApp({ Component, pageProps }: AppProps) {
  const { categories, category = '' } = pageProps;

  return (
    <GeneralLayout categories={categories} category={category}>
      <Component {...pageProps} />
    </GeneralLayout>
  );
}

export default MyApp;
