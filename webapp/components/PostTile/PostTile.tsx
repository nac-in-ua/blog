import { Categories, Keywords } from '../Badges';
import Heading from './Heading';
import ReadMoreButton from './ReadMoreButton';
import Activity from './Activity';
import CreatedDate from './CreatedDate';
import Poster from './Poster';
import { PostData } from '../../@types/posts';

type PostTilePropsType = {
  post: PostData;
};

const PostTile = ({ post }: PostTilePropsType) => {
  const { title, poster, shortDescription, slug, categories, keywords } = post;

  return (
    <div className="flex p-2 my-2 bg-white border border-1 shadow-sm flex-col">
      <div className="flex w-full">
        <Poster data={poster} />
      </div>
      <div className="mt-2">
        <div className="flex my-1">
          <CreatedDate date={post.createdAt} />
          <div className="flex ml-4">
            <Categories categories={categories} />
          </div>
        </div>
        <div className="flex">
          <Heading title={title} slug={slug} />
        </div>
        <div className="flex my-1">
          <Keywords keywords={keywords} />
        </div>
        <div className="flex text-gray-700 my-1">{shortDescription}</div>
        <div className="flex justify-start my-1">
          <ReadMoreButton slug={slug} />
        </div>
        <div className="flex flex-row text-thin text-sm text-gray-600 my-1">
          <Activity likes={5} comments={19} />
        </div>
      </div>
    </div>
  );
};

export default PostTile;
