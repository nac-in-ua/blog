import { IPost } from '../@types/generated/contentful';
import Image from 'next/image';
import Link from 'next/link';
import { DateTime } from 'luxon';

type PostTilePropsType = {
  post: IPost;
};

const formatDate = (date: string) => {
  // return DateTime.fromISO(date).setZone("America/La_Paz").toFormat('dd LLL yyyy HH:mm');
  return DateTime.fromISO(date, { zone: 'Europe/Kiev' }).toFormat(
    'dd LLL yyyy HH:mm'
  );
};

const PostTile = ({ post }: PostTilePropsType) => {
  const { title, poster, shortDescription, category, slug } = post.fields;

  return (
    <div className="p-2 my-2 bg-slate-100">
      <h2 className="font-bold mb-2 text-2xl">{title}</h2>
      <h5>{formatDate(post.sys.createdAt)}</h5>
      <div className="flex w-1/2">
        <Image
          src={`https:${poster?.fields.file.url || ''}`}
          alt={poster?.fields.title}
          height={poster?.fields.file.details.image?.height}
          width={poster?.fields.file.details.image?.width}
        />
      </div>
      <div className="flex">{shortDescription}</div>
      <div className="flex my-2">
        {category.map((category) => (
          <div
            className="flex rounded-full bg-orange-200 w-24 h-6 justify-center mx-1"
            key={category}
          >
            {category}
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Link href={`/posts/${slug}`}>
          <a className="flex rounded-lg w-36 h-10 bg-green-200 relative justify-center items-center">
            Read more
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PostTile;
