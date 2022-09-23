import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { MdOutlineBookmarkAdd, MdBookmark } from 'react-icons/md';

type PropsType = {
  postId: string;
  size?: number;
};

const Bookmark = ({ postId, size = 22 }: PropsType) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    const getIsLiked = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/save/${postId}`);
        const data = await res.json();

        setIsSaved(data.isSaved);
      } catch (error) {
        console.log('is liked: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    session && getIsLiked();
  }, [postId, isSaved, session]);

  const handleClick = () => {
    const getData = async () => {
      try {
        setIsLoading(true);
        await fetch(`/api/save/${postId}`, {
          method: 'POST',
        });
        setIsSaved((isSaved) => !isSaved);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (session) {
      getData();
    } else {
      console.error('you have to be logged in to save a post');
    }
  };

  if (isLoading) {
    return (
      <div className="ml-auto flex">
        <AiOutlineLoading
          className="animate-spin items-center justify-center"
          size={20}
        />
      </div>
    );
  }

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
