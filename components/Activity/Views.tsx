import { memo } from 'react';
import { getDividedCount } from '../../utils/format';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

type PropsType = {
  count: number;
  size?: number;
};

const ViewsActivity = ({ count, size = 22 }: PropsType) => {
  return (
    <div title="Number of views" className="flex items-center gap-2">
      <MdOutlineRemoveRedEye size={size} />
      <div>{getDividedCount(count)}</div>
    </div>
  );
};

export default memo(ViewsActivity);
