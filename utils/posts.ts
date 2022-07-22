import { IPost } from '../@types/generated/contentful';
import { PostData } from '../@types/posts';

const sortedPosts = (posts: PostData[]) => {
  return posts.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};

export { sortedPosts };
