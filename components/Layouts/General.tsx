import Navbar from '../Navbar';
import Footer from '../Footer';
import Link from 'next/link';
import MainPanel from '../Panels/MainPanel';
import { CategoriesItem, Panel } from '../../hygraph/Panel';

type PropsType = {
  children: React.ReactNode;
  categories: CategoriesItem[];
  panel: Panel;
};

export default function GeneralLayout({
  children,
  categories,
  panel,
}: PropsType) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-slate-300 text-xl uppercase">
        <div className="mx-auto my-2 px-4 md:max-w-3xl lg:max-w-5xl">
          <Link href="/">nac</Link>
        </div>
      </header>
      <nav className="sticky top-0 z-10 border-b bg-white">
        <div className="mx-auto px-4 md:max-w-3xl lg:max-w-5xl">
          <Navbar categories={categories} />
        </div>
      </nav>
      <main className="mx-auto mt-4 flex flex-col px-4 md:max-w-3xl lg:max-w-5xl lg:flex-row">
        <div className="mb-4 flex w-full px-2 lg:w-3/4">{children}</div>
        <aside className="flex w-full flex-col gap-y-2 px-2 lg:w-1/4">
          <MainPanel widgets={panel.widgets} />
        </aside>
      </main>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
