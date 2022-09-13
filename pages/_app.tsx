import '../styles/globals.css';
import type { AppProps } from 'next/app';
import GeneralLayout from '../components/Layouts/General';

function MyApp({ Component, pageProps }: AppProps) {
  const { categories, panel } = pageProps;

  return (
    <GeneralLayout categories={categories} panel={panel}>
      <Component {...pageProps} />
    </GeneralLayout>
  );
}

export default MyApp;
