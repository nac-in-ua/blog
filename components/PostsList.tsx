import PostTile from '../components/PostTile';
import { sortedPosts } from '../utils/posts';
import { IPostData } from '../@types/posts';

type PropsType = {
  posts: IPostData[];
};

const PostsList = ({ posts }: PropsType) => {
  return (
    <>
      {sortedPosts(posts).map((post) => (
        <PostTile key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostsList;
