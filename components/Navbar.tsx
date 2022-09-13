import Link from 'next/link';
import React from 'react';
import { CategoriesItem } from '../hygraph/Panel';
import { AiOutlineUser } from 'react-icons/ai';

type PropsType = {
  categories: CategoriesItem[];
};

const Navbar = ({ categories }: PropsType) => {
  return (
    <>
      <div className="flex h-12 py-2">
        <div className="flex flex-1 items-center self-stretch">
          {categories.map((cat) => {
            return (
              <React.Fragment key={cat.id}>
                <Link href={`/categories/${cat.slug}`}>
                  <a className="mx-2 flex cursor-pointer text-gray-700 hover:text-gray-500">
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
          <AiOutlineUser size={20} />
        </div>
      </div>
    </>
  );
};

export default Navbar;
