import { IPost } from '../@types/generated/contentful';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '../utils/format';
import CategoriesBadge from './CategoriesBadge';
import Keywords from './KeywordsBadge';

type PostTilePropsType = {
  post: IPost;
};

const PostTile = ({ post }: PostTilePropsType) => {
  const { title, poster, shortDescription, slug, categories, keywords } =
    post.fields;

  return (
    <div className="flex p-2 my-2 bg-white border border-1 shadow-sm lg:flex-col">
      <div className="flex w-1/3 lg:w-full">
        <Image
          src={`https:${poster?.fields.file.url || ''}`}
          alt={poster?.fields.title}
          height={poster?.fields.file.details.image?.height}
          width={poster?.fields.file.details.image?.width}
          placeholder="blur"
          blurDataURL={`https:${poster?.fields.file.url || ''}`}
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="flex flex-col w-2/3 lg:w-full lg:mt-4 ml-2">
        <div className="flex lg:justify-start sm:justify-between">
          <h5 className="flex text-sm text-gray-600">
            {formatDate(post.sys.createdAt)}
          </h5>
          <div className="lg:ml-4">
            <CategoriesBadge categories={categories} />
          </div>
        </div>
        <h2 className="flex font-bold text-2xl text-gray-700">{title}</h2>
        <div className="flex flex-col mb-2">
          <Keywords keywords={keywords} />
        </div>
        <div className="flex mb-auto text-gray-700">{shortDescription}</div>
        <div className="flex sm:justify-end lg:justify-start mt-4">
          <Link href={`/posts/${slug}`}>
            <a className="flex w-36 h-10 border hover:bg-gray-50 justify-center items-center">
              Read more
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};;;

export default PostTile;
