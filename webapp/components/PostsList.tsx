import PostTile from '../components/PostTile';
import { sortedPosts } from '../utils/posts';
import { PostData } from '../@types/posts';

type PropsType = {
  posts: PostData[];
};

const PostsList = ({ posts }: PropsType) => {
  return (
    <>
      {sortedPosts(posts).map((post) => (
        <PostTile key={post.title} post={post} />
      ))}
    </>
  );
};

export default PostsList;
