import { memo, useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import { getDividedCount } from '../../utils/format';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

type PropsType = {
  size?: number;
  postId: string;
};

type Views = {
  views: string;
};

const ViewsActivity = ({ postId, size = 22 }: PropsType) => {
  const { data } = useSWR<Views>(`/api/views/${postId}`, fetcher);
  const views = data?.views;

  return (
    <div title="Number of views" className="flex items-center gap-2">
      <MdOutlineRemoveRedEye size={size} />
      <div>{views ? getDividedCount(parseInt(views, 10)) : '–––'}</div>
    </div>
  );
};

export default memo(ViewsActivity);
