import { DateTime } from 'luxon';

export const formatDate = (date: string) => {
  return DateTime.fromISO(date, { zone: 'Europe/Kiev' }).toFormat(
    'dd LLL yyyy HH:mm'
  );
};

export const getDividedCount = (count: number) => {
  if (count < 1000) return count;
  if (count < 1000000) return `${Math.round(count / 100) / 10}K`;
  return `${Math.round(count / 100000) / 10}M`;
};
