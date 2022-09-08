import { formatDate } from '../../utils/format';

type PropsType = {
  dateTime: string;
};

const CreatedDate = ({ dateTime }: PropsType) => {
  return <h5 className="flex text-sm text-gray-600">{formatDate(dateTime)}</h5>;
};

export default CreatedDate;
