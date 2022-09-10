import PostTile from '../components/PostTile';
import { PostCover } from '../hygraph/Post';

type PropsType = {
  posts: PostCover[];
};

const PostsList = ({ posts }: PropsType) => {
  return (
    <>
      {posts.map((post) => (
        <PostTile key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostsList;
