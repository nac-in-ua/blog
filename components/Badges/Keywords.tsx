import { MouseEvent } from 'react';
import { KeywordData } from '../../@types/posts';

type PropsType = {
  keywords: KeywordData[];
};

const Keywords = ({ keywords }: PropsType) => {
  const handleClick = (event: MouseEvent<HTMLLIElement>) => {
    console.log(event.currentTarget.dataset['keyword']);
  };
  if (!keywords || keywords.length === 0) {
    return null;
  }
  return (
    <ul className="flex divide-x divide-solid">
      {keywords.map(({ name, id }) => (
        <li
          onClick={handleClick}
          data-keyword={name}
          className="flex first:pl-0 px-1 text-sm text-gray-500 cursor-pointer before:content-['#'] hover:underline"
          key={id}
        >
          {name}
        </li>
      ))}
    </ul>
  );
};

export default Keywords;
