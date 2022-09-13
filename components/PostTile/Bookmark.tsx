import { MouseEvent } from 'react';
import { MdOutlineBookmarkAdd, MdBookmark } from 'react-icons/md';

type PropsType = {
  isSaved: boolean;
  postId: string;
  size?: number;
};

const Bookmark = ({ postId, isSaved, size = 22 }: PropsType) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    console.log(postId);
  };
  return (
    <div
      className="ml-auto flex cursor-pointer items-center"
      title="Save this post"
      onClick={handleClick}
    >
      {isSaved ? (
        <MdBookmark className="text-gray-700" size={size} />
      ) : (
        <MdOutlineBookmarkAdd className="text-gray-700" size={size} />
      )}
    </div>
  );
};

export default Bookmark;
