import { IPost } from '../@types/generated/contentful';

const sortedPosts = (posts: IPost[]) => {
  return posts.sort((a, b) => {
    return (
      new Date(b.sys.createdAt).getTime() - new Date(a.sys.createdAt).getTime()
    );
  });
};

export { sortedPosts };
