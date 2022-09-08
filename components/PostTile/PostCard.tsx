import { Category, Keywords } from '../Badges';
import Heading from './Heading';
import ReadMoreButton from './ReadMoreButton';
import Activity from './Activity';
import CreatedDate from './CreatedDate';
import CoverImage from './CoverImage';
import { IPostData } from '../../@types/posts';
import MenuButton from './MenuButton';

type PostCardPropsType = {
  post: IPostData;
};

const PostCard = ({ post }: PostCardPropsType) => {
  const {
    title,
    shortDescription,
    slug,
    category,
    keywords,
    publishedDateTime,
    coverImage,
    id,
  } = post;

  return (
    <article className="border-1 flex flex-col border bg-white p-2 shadow-sm">
      <section className="flex">
        <CoverImage data={coverImage} />
      </section>
      <section className="mt-2">
        <div className="my-1 flex justify-between">
          <div className="flex">
            <CreatedDate dateTime={publishedDateTime} />
            <div className="ml-4 flex">
              <Category category={category} />
            </div>
          </div>
          <div className="flex">
            <MenuButton />
          </div>
        </div>
        <div className="flex">
          <Heading title={title} slug={slug} />
        </div>
        <div className="my-1 flex">
          <Keywords keywords={keywords} />
        </div>
        <div className="my-1 flex text-gray-700">{shortDescription}</div>
        <div className="my-1 flex justify-start">
          <ReadMoreButton slug={slug} />
        </div>
        <div className="text-thin my-1 flex flex-row text-sm text-gray-600">
          <Activity
            postId={id}
            views={123456}
            likes={123}
            comments={1234567}
            isSaved={false}
          />
        </div>
      </section>
    </article>
  );
};

export default PostCard;