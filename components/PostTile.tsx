import { IPost } from '../@types/generated/contentful';
import Image from 'next/image';
import Link from 'next/link';
import { DateTime } from 'luxon';
import CategoriesBadge from './CategoriesBadge';

type PostTilePropsType = {
  post: IPost;
};

const formatDate = (date: string) => {
  return DateTime.fromISO(date, { zone: 'Europe/Kiev' }).toFormat(
    'dd LLL yyyy HH:mm'
  );
};

const PostTile = ({ post }: PostTilePropsType) => {
  const { title, poster, shortDescription, slug, categories } = post.fields;

  return (
    <div className="flex p-2 my-2 bg-slate-100">
      <div className="flex w-1/3">
        <Image
          src={`https:${poster?.fields.file.url || ''}`}
          alt={poster?.fields.title}
          height={poster?.fields.file.details.image?.height}
          width={poster?.fields.file.details.image?.width}
        />
      </div>
      <div className="flex flex-col w-2/3 ml-2">
        <h5 className="flex text-sm">{formatDate(post.sys.createdAt)}</h5>
        <h2 className="flex font-bold text-2xl">{title}</h2>
        <div className="flex mt-2 mb-4">
          <CategoriesBadge categories={categories} />
        </div>
        <div className="flex mb-auto">{shortDescription}</div>
        <div className="flex justify-end mt-4">
          <Link href={`/posts/${slug}`}>
            <a className="flex rounded-lg w-36 h-10 bg-emerald-300 justify-center items-center">
              Read more
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostTile;
