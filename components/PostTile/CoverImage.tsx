import Image from 'next/image';
import { CoverImage } from '../../hygraph/Post';

type PropsType = {
  data: CoverImage;
};

const Poster = ({ data }: PropsType) => {
  const { url, alt, width, height } = data;
  return (
    <Image
      src={url}
      alt={alt}
      width={975}
      height={500}
      placeholder="blur"
      blurDataURL={url}
      objectFit="cover"
      objectPosition="center"
    />
  );
};

export default Poster;
