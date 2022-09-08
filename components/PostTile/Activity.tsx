import ViewsActivity from '../Activity/Views';
import LikesActivity from '../Activity/Likes';
import CommentsActivity from '../Activity/Comments';
import Bookmark from './Bookmark';

type PropsType = {
  postId: string;
  views: number;
  likes: number;
  comments: number;
  isSaved: boolean;
};

const Activity = ({ views, likes, comments, isSaved }: PropsType) => {
  return (
    <div className="flex flex-row space-x-2">
      <ViewsActivity count={views} />
      <LikesActivity count={likes} />
      <CommentsActivity count={comments} />
      <Bookmark isSaved={isSaved} />
    </div>
  );
};

export default Activity;
