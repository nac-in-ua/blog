import { ICategory } from '../@types/generated/contentful';
import { MouseEvent } from 'react';
import Link from 'next/link';

type PropsType = {
  categories: ICategory[];
};

const CategoriesBadge = ({ categories }: PropsType) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    console.log(event.currentTarget.dataset.value);
  };
  return (
    <>
      {categories.map(({ fields: { name } }) => (
        <Link key={name} href={`/categories/${name?.toLowerCase()}`}>
          <a
            onClick={handleClick}
            data-value={name}
            className="flex rounded-md mx-1 px-2 first:ml-0 bg-gray-200 text-sm text-gray-700"
          >
            {name}
          </a>
        </Link>
      ))}
    </>
  );
};

export default CategoriesBadge;
