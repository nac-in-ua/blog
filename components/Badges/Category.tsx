import { MouseEvent } from 'react';
import Link from 'next/link';
import { CategoriesItem } from '../../hygraph/Panel';

type PropsType = {
  category: CategoriesItem;
};

const Category = ({ category }: PropsType) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    console.log(event.currentTarget.dataset['category']);
  };
  const { name, slug } = category;
  return (
    <>
      <Link href={`/categories/${slug}`}>
        <a
          onClick={handleClick}
          data-category={slug}
          className="mx-1 flex rounded-md bg-gray-200 px-2 text-sm text-gray-700 first:ml-0"
        >
          {name}
        </a>
      </Link>
    </>
  );
};

export default Category;
