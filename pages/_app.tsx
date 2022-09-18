import '../styles/globals.css';
import type { AppProps } from 'next/app';
import GeneralLayout from '../components/Layouts/General';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
  const { categories, panel } = pageProps;

  return (
    <SessionProvider session={pageProps.session}>
      <GeneralLayout categories={categories} panel={panel}>
        <Component {...pageProps} />
      </GeneralLayout>
    </SessionProvider>
  );
}

export default MyApp;
