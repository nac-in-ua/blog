import { Category } from '../Badges';
import CreatedDate from './CreatedDate';
import { PostCover } from '../../hygraph/Post';
import Link from 'next/link';
import Views from '../Activity/Views';
import Likes from '../Activity/Likes';
import Bookmark from './Bookmark';

type PostCardPropsType = {
  post: PostCover;
};

const PostCard = ({ post }: PostCardPropsType) => {
  const {
    title,
    shortDescription,
    slug,
    category,
    publishedAt,
    id,
    likes,
    views,
    isSaved,
  } = post;

  return (
    <section className="flex flex-col gap-1 p-2">
      <div className="-ml-0.5 flex">
        <Category category={category} />
      </div>
      <Link href={`/post/${slug}`}>
        <p className="cursor-pointer text-2xl font-bold text-gray-700 hover:text-gray-500">
          {title}
        </p>
      </Link>
      <CreatedDate dateTime={publishedAt} />
      <div className="">{shortDescription}</div>
      <div className="flex flex-row gap-2">
        <Views count={views} />
        <Likes postId={id} count={likes} isLiked={Math.random() > 0.5} />
        <Bookmark postId={id} isSaved={isSaved} />
      </div>
    </section>
  );
};

export default PostCard;
