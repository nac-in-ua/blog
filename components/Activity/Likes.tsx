import { memo } from 'react';
import { getDividedCount } from '../../utils/format';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';

type PropsType = {
  postId: string;
  count: number;
  isLiked: boolean;
  size?: number;
};

const LikesActivity = ({ postId, count, isLiked, size = 22 }: PropsType) => {
  const handleClick = () => {
    console.log(postId);
  };

  return (
    <button
      title="Like this post"
      className="flex cursor-pointer items-center gap-2"
      onClick={handleClick}
    >
      {isLiked ? <IoMdHeart size={size} /> : <IoMdHeartEmpty size={size} />}
      <span>{getDividedCount(count)}</span>
    </button>
  );
};

export default memo(LikesActivity);
