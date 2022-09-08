import { ChatIcon } from '@heroicons/react/outline';
import { memo } from 'react';
import { getDividedCount } from '../../utils/format';

type PropsType = {
  count: number;
};

const CommentsActivity = ({ count }: PropsType) => {
  return (
    <div className="group flex cursor-pointer">
      <ChatIcon className="h-5 w-5 transition-colors duration-300 ease-in-out group-hover:text-blue-600" />
      <span className="ml-2">{getDividedCount(count)}</span>
    </div>
  );
};

export default memo(CommentsActivity);
