import { IPost } from '../@types/generated/contentful';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '../utils/format';
import CategoriesBadge from './CategoriesBadge';
import Keywords from './KeywordsBadge';
import { HeartIcon, ChatIcon } from '@heroicons/react/outline';

type PostTilePropsType = {
  post: IPost;
};

const PostTile = ({ post }: PostTilePropsType) => {
  const { title, poster, shortDescription, slug, categories, keywords } =
    post.fields;

  return (
    <div className="flex p-2 my-2 bg-white border border-1 shadow-sm flex-col">
      <div className="flex w-full">
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
      <div className="flex flex-col mt-2">
        <div className="flex my-1">
          <h5 className="flex text-sm text-gray-600">
            {formatDate(post.sys.createdAt)}
          </h5>
          <div className="ml-4">
            <CategoriesBadge categories={categories} />
          </div>
        </div>
        <Link href={`/posts/${slug}`}>
          <h2 className="flex font-bold text-2xl text-gray-700 my-1 cursor-pointer hover:text-gray-500">
            {title}
          </h2>
        </Link>
        <div className="flex flex-col my-1">
          <Keywords keywords={keywords} />
        </div>
        <div className="flex text-gray-700 my-1">{shortDescription}</div>
        <div className="flex justify-start my-1">
          <Link href={`/posts/${slug}`}>
            <a className="flex w-36 h-10 border hover:bg-gray-50 justify-center items-center">
              Read more
            </a>
          </Link>
        </div>
        <div className="flex flex-row text-thin text-sm text-gray-600 my-1">
          <div className="flex items-center flex-row ml-2">
            <HeartIcon className="h-5 w-5" />
            <span className="ml-2">5</span>
          </div>
          <div className="flex items-center flex-row ml-2">
            <ChatIcon className="h-5 w-5" />
            <span className="ml-2">19</span>
          </div>
        </div>
      </div>
    </div>
  );
};;;

export default PostTile;
