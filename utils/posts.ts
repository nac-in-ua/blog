import { IPostData } from '../@types/posts';

const sortedPosts = (posts: IPostData[]) => {
  return posts.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};

export { sortedPosts };
