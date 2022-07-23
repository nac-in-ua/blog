import { HeartIcon, ChatIcon } from '@heroicons/react/outline';

type PropsType = {
  likes: number;
  comments: number;
};

const Activity = ({ likes, comments }: PropsType) => {
  return (
    <>
      <div className="flex items-center flex-row ml-2">
        <HeartIcon className="h-5 w-5" />
        <span className="ml-2">{likes}</span>
      </div>
      <div className="flex items-center flex-row ml-2">
        <ChatIcon className="h-5 w-5" />
        <span className="ml-2">{comments}</span>
      </div>
    </>
  );
};

export default Activity;
