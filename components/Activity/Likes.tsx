import { HeartIcon } from '@heroicons/react/outline';
import { memo } from 'react';
import { getDividedCount } from '../../utils/format';

type PropsType = {
  count: number;
};

const LikesActivity = ({ count }: PropsType) => {
  const handleClick = () => {
    console.log('likes clicked');
  };

  return (
    <div className="group flex cursor-pointer" onClick={handleClick}>
      <HeartIcon className="h-5 w-5 transition-colors duration-300 ease-in-out group-hover:text-red-600" />
      <span className="ml-2">{getDividedCount(count)}</span>
    </div>
  );
};

export default memo(LikesActivity);
