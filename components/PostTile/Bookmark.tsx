import { MouseEvent } from 'react';
import { BookmarkIcon } from '@heroicons/react/outline';

type PropsType = {
  isSaved: boolean;
};

const Bookmark = ({ isSaved }: PropsType) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    console.log('bookbark clicked');
  };
  return (
    <div className="group flex cursor-pointer" onClick={handleClick}>
      <BookmarkIcon
        className={`h-5 w-5 transition-colors duration-300 ease-in-out ${
          isSaved
            ? 'fill-gray-400 group-hover:fill-white'
            : 'fill-white group-hover:fill-gray-400'
        }`}
      />
    </div>
  );
};

export default Bookmark;
