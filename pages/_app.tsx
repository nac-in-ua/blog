import '../styles/globals.css';
import type { AppProps } from 'next/app';
import GeneralLayout from '../components/Layouts/General';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { CategoriesItem, Panel } from '../hygraph/Panel';

type BlogAppProps = AppProps & {
  pageProps: AppProps['pageProps'] & {
    categories: CategoriesItem[];
    panel: Panel;
    session: SessionProviderProps['session'];
  };
};

function MyApp({ Component, pageProps }: BlogAppProps) {
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
