import { IPost } from '../../@types/generated/contentful';
import CategoriesBadge from '../CategoriesBadge';
import Keywords from '../KeywordsBadge';
import Heading from './Heading';
import ReadMoreButton from './ReadMoreButton';
import Activity from './Activity';
import CreatedDate from './CreatedDate';
import Poster from './Poster';

type PostTilePropsType = {
  post: IPost;
};

const PostTile = ({ post }: PostTilePropsType) => {
  const { title, poster, shortDescription, slug, categories, keywords } =
    post.fields;

  return (
    <div className="flex p-2 my-2 bg-white border border-1 shadow-sm flex-col">
      <div className="flex w-full">
        <Poster data={poster} />
      </div>
      <div className="mt-2">
        <div className="flex my-1">
          <CreatedDate date={post.sys.createdAt} />
          <div className="flex ml-4">
            <CategoriesBadge categories={categories} />
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
