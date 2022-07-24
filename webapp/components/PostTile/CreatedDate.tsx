import { formatDate } from '../../utils/format';

type PropsType = {
  date: string;
};

const CreatedDate = ({ date }: PropsType) => {
  return <h5 className="flex text-sm text-gray-600">{formatDate(date)}</h5>;
};

export default CreatedDate;
