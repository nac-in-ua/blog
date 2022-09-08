import '../styles/globals.css';
import type { AppProps } from 'next/app';
import GeneralLayout from '../components/Layouts/General';

function MyApp({ Component, pageProps }: AppProps) {
  const { categories, category = '', panel } = pageProps;

  return (
    <GeneralLayout categories={categories} category={category} panel={panel}>
      <Component {...pageProps} />
    </GeneralLayout>
  );
}

export default MyApp;
