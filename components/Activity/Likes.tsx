import { memo, useEffect } from 'react';
import { getDividedCount } from '../../utils/format';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import { useSession } from 'next-auth/react';
import { authOptions } from '../../pages/api/auth/[...nextauth]';

type PropsType = {
  postId: string;
  size?: number;
};

type Likes = {
  likes: string;
};

const LikesActivity = ({ postId, size = 22 }: PropsType) => {
  const { data } = useSWR<Likes>(`/api/likes/${postId}`, fetcher);
  const like = useSWR<{ isLiked: boolean }>(`/api/like/${postId}`, fetcher);
  const isLiked = like.data?.isLiked;

  const likes = data?.likes;

  const handleClick = () => {
    const getData = async () => {
      const res = await fetch(`/api/like/${postId}`, {
        method: 'POST',
      });
      const data = await res.json();
      console.log(data);
    };
    if (session) {
      getData();
    } else {
      console.error('you have to be logged in to like a post');
    }
  };

  const { data: session } = useSession();

  return (
    <button
      title="Like this post"
      className="flex cursor-pointer items-center gap-2"
      onClick={handleClick}
    >
      {isLiked ? <IoMdHeart size={size} /> : <IoMdHeartEmpty size={size} />}
      <span>{likes ? getDividedCount(parseInt(likes, 10)) : '–––'}</span>
    </button>
  );
};

export default memo(LikesActivity);
