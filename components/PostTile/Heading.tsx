import Link from 'next/link';

type PropsType = {
  title: string;
  slug: string;
};

const Heading = ({ title, slug }: PropsType) => {
  return (
    <Link href={`/posts/${slug}`}>
      <h2 className="font-bold text-2xl text-gray-700 my-1 cursor-pointer hover:text-gray-500">
        {title}
      </h2>
    </Link>
  );
};

export default Heading;
