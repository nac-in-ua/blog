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
    <ul className="flex divide-x divide-solid">
      {categories.map((category) => (
        <li
          onClick={handleClick}
          data-value={category.fields.name}
          className="flex first:pl-0 px-1 text-sm text-gray-500 cursor-pointer before:content-['#'] hover:underline"
          key={category.fields.name}
        >
          {category.fields.name}
        </li>
      ))}
    </ul>
  );
};

export default CategoriesBadge;
