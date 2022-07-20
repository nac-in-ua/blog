import Link from 'next/link';

type PropsType = {
  slug: string;
};

const ReadMoreButton = ({ slug }: PropsType) => {
  return (
    <Link href={`/posts/${slug}`}>
      <a className="flex w-36 h-10 border hover:bg-gray-50 justify-center items-center">
        Read more
      </a>
    </Link>
  );
};

export default ReadMoreButton;
