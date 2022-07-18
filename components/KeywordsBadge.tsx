import { MouseEvent } from 'react';
import { IPostFields } from '../@types/generated/contentful';

type PropsType = {
  keywords: IPostFields['keywords'];
};

const Keywords = ({ keywords }: PropsType) => {
  const handleClick = (event: MouseEvent<HTMLLIElement>) => {
    console.log(event.currentTarget.dataset.value);
  };
  if (!keywords) {
    return null;
  }
  return (
    <ul className="flex divide-x divide-solid">
      {keywords.map((keyword) => (
        <li
          onClick={handleClick}
          data-value={keyword}
          className="flex first:pl-0 px-1 text-sm text-gray-500 cursor-pointer before:content-['#'] hover:underline"
          key={keyword}
        >
          {keyword}
        </li>
      ))}
    </ul>
  );
};

export default Keywords;
