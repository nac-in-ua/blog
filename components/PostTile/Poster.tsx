import Image from 'next/image';
import { IPostFields } from '../../@types/generated/contentful';

type PropsType = {
  data: IPostFields['poster'];
};

const Poster = ({ data }: PropsType) => {
  const {
    url,
    details: { image },
  } = data.fields.file;
  const { title } = data.fields;
  return (
    <Image
      src={`https:${url}`}
      alt={title}
      height={image?.height}
      width={image?.width}
      placeholder="blur"
      blurDataURL={`https:${url}`}
      objectFit="cover"
      objectPosition="center"
    />
  );
};

export default Poster;
