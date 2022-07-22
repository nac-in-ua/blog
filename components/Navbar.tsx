import { ICategory } from '../@types/generated/contentful';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/outline';

type PropsType = {
  categories: string[];
  category?: string;
};

const Navbar = ({ categories, category }: PropsType) => {
  return (
    <div className="sticky top-0 bg-white z-10 border-b mb-6">
      <div className="m-auto max-w-2xl py-2 flex h-12">
        <nav className="flex flex-1 self-stretch items-center">
          {categories.map((cat) => (
            <Link key={cat} href={`/categories/${cat.toLowerCase()}`}>
              <a
                className={`flex mx-2 cursor-pointer hover:text-gray-500 ${
                  cat.toLowerCase() === category?.toLowerCase()
                    ? 'text-gray-700'
                    : 'text-gray-400'
                }`}
              >
                {cat}
              </a>
            </Link>
          ))}
        </nav>
        <div className="flex text-red-500 items-center">
          login
          <UserIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
