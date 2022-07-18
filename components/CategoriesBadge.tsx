import { ICategory } from '../@types/generated/contentful';
import { MouseEvent } from 'react';

type PropsType = {
  categories: ICategory[];
};

const CategoriesBadge = ({ categories }: PropsType) => {
  const handleClick = (event: MouseEvent<HTMLLIElement>) => {
    console.log(event.currentTarget.dataset.value);
  };
  return (
    <ul className="flex">
      {categories.map((category) => (
        <li
          onClick={handleClick}
          data-value={category.fields.name}
          className="flex rounded-md mx-1 px-2 first:ml-0 bg-gray-200 text-sm text-gray-700 cursor-pointer"
          key={category.fields.name}
        >
          {category.fields.name}
        </li>
      ))}
    </ul>
  );
};

export default CategoriesBadge;
