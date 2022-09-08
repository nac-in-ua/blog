import { EyeIcon } from '@heroicons/react/outline';
import { memo } from 'react';
import { getDividedCount } from '../../utils/format';

type PropsType = {
  count: number;
};

const ViewsActivity = ({ count }: PropsType) => {
  const handleClick = () => {
    console.log('views clicked');
  };

  return (
    <div className="group flex cursor-pointer" onClick={handleClick}>
      <EyeIcon className="h-5 w-5 transition-colors duration-300 ease-in-out group-hover:text-yellow-600" />
      <span className="ml-2">{getDividedCount(count)}</span>
    </div>
  );
};

export default memo(ViewsActivity);
