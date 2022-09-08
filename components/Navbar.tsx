import type { ICategoryData } from '../@types/posts';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/outline';
import { EVERYTHING } from '../utils/categories';
import React from 'react';

type PropsType = {
  categories: ICategoryData[];
  category: ICategoryData;
};

const Navbar = ({ categories, category }: PropsType) => {
  return (
    <>
      <div className="flex h-12 py-2">
        <div className="flex flex-1 items-center self-stretch">
          {categories.map((cat) => {
            const url =
              cat.slug === EVERYTHING.slug ? '/' : `/categories/${cat.slug}`;
            return (
              <React.Fragment key={cat.id}>
                <Link href={url}>
                  <a
                    className={`mx-2 flex cursor-pointer hover:text-gray-500 ${
                      cat.slug === category.slug
                        ? 'text-gray-700'
                        : 'text-gray-400'
                    }`}
                  >
                    {cat.name}
                  </a>
                </Link>
                <div className="relative bottom-2 right-2 flex h-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
                  10
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <div className="flex items-center text-red-500">
          login
          <UserIcon className="h-5 w-5" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
