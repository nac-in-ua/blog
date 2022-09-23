import { MouseEvent } from 'react';
import { KeywordData } from '../../hygraph/Post';

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
          className="flex cursor-pointer px-1 text-sm text-gray-500 before:content-['#'] first:pl-0 hover:underline"
          key={id}
        >
          {name}
        </li>
      ))}
    </ul>
  );
};

export default Keywords;
