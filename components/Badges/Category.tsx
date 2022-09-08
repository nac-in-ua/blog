import { ICategoryData } from '../../@types/posts/index';
import { MouseEvent } from 'react';
import Link from 'next/link';

type PropsType = {
  category: ICategoryData;
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
          className="flex rounded-md mx-1 px-2 first:ml-0 bg-gray-200 text-sm text-gray-700"
        >
          {name}
        </a>
      </Link>
    </>
  );
};

export default Category;
