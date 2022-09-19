import { memo, useEffect, useState } from 'react';
import { getDividedCount } from '../../utils/format';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import { useSession } from 'next-auth/react';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { AiOutlineLoading } from 'react-icons/ai';

type PropsType = {
  postId: string;
  size?: number;
};

type Likes = {
  likes: string;
};

const LikesActivity = ({ postId, size = 22 }: PropsType) => {
  // const { data } = useSWR<Likes>(`/api/likes/${postId}`, fetcher);
  // const like = useSWR<{ isLiked: boolean }>(`/api/like/${postId}`, fetcher);
  // const isLiked = like.data?.isLiked;
  // const likes = data?.likes;
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [likes, setLikes] = useState<string>('0');
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    const getLikesCount = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/likes/${postId}`);
        const data = await res.json();

        setLikes(data.likes);
      } catch (error) {
        console.log('likes count: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    const getIsLiked = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/like/${postId}`);
        const data = await res.json();

        setIsLiked(data.isLiked);
      } catch (error) {
        console.log('is liked: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    getLikesCount();
    session && getIsLiked();
  }, [postId, isLiked, session]);

  const handleClick = () => {
    const getData = async () => {
      try {
        setIsLoading(true);
        await fetch(`/api/like/${postId}`, {
          method: 'POST',
        });
        setIsLiked((isLiked) => !isLiked);
      } catch (error) {
        console.log('like: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (session) {
      getData();
    } else {
      console.error('you have to be logged in to like a post');
    }
  };

  if (isLoading) {
    return (
      <AiOutlineLoading
        className="flex animate-spin items-center justify-center"
        size={20}
      />
    );
  }

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
