import { DateTime } from 'luxon';

const formatDate = (date: string) => {
  return DateTime.fromISO(date, { zone: 'Europe/Kiev' }).toFormat(
    'dd LLL yyyy HH:mm'
  );
};

export { formatDate };
