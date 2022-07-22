import Navbar from './Navbar';
import Footer from './Footer';
import Link from 'next/link';
import { ICategory } from '../@types/generated/contentful';

type PropsType = {
  children: React.ReactNode;
  categories: string[];
  category: string;
};

export default function Layout({ children, categories, category }: PropsType) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center bg-slate-300 text-xl uppercase py-1 font-heading">
        <Link href="/">nac development</Link>
      </div>
      <Navbar categories={categories} category={category} />
      <main className="flex mx-auto max-w-2xl">{children}</main>
      <Footer />
    </div>
  );
}
